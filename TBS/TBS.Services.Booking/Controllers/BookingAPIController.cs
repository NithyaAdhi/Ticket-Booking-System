using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Booking.Data;
using Services.Booking.Models;
using Services.Booking.Models.Dto;

namespace Services.Booking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingAPIController : ControllerBase
    {
        private readonly AppDbContext _db;

        public BookingAPIController(AppDbContext context)
        {
            _db = context;
        }

        // GET: api/BookingAPI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookings()
        {
            var bookings = await _db.Booking.Select(b => new BookingDto
            {
                BookingId = b.BookingId,
                Nic = b.Nic,
                TrainNo = b.TrainNo,
                SourceStation = b.SourceStation,
                DestinationStation = b.DestinationStation,
                TravelDate = b.TravelDate,
                BookedSeats = b.BookedSeats
            }).ToListAsync();

            return Ok(bookings);
        }

        // GET: api/BookingAPI/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDto>> GetBooking(int id)
        {
            var booking = await _db.Booking.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            var bookingDto = new BookingDto
            {
                BookingId = booking.BookingId,
                Nic = booking.Nic,
                TrainNo = booking.TrainNo,
                SourceStation = booking.SourceStation,
                DestinationStation = booking.DestinationStation,
                TravelDate = booking.TravelDate,
                BookedSeats = booking.BookedSeats
            };

            return Ok(bookingDto);
        }

        // POST: api/BookingAPI
        [HttpPost]
        public async Task<ActionResult<BookingDto>> PostRestrictBooking(BookingDto bookingDto)
        {
            // Validate if NIC number is provided
            if (string.IsNullOrEmpty(bookingDto.Nic))
            {
                return BadRequest("NIC number is required.");
            }

            // Check if the user has already booked seats on the same travel date
            var existingBookings = await _db.Booking
                .Where(b => b.Nic == bookingDto.Nic && b.TravelDate.Date == bookingDto.TravelDate.Date)
                .ToListAsync();

            // Calculate the total number of seats already booked by the user on the same travel date
            int totalBookedSeats = existingBookings.Sum(b => b.BookedSeats.Count);

            // Calculate the number of seats being booked in the current request
            int seatsBeingBooked = bookingDto.BookedSeats.Count;

            // Check if adding the current booking would exceed the limit of 5 seats
            if (totalBookedSeats + seatsBeingBooked > 5)
            {
                return BadRequest("Maximum 5 seats can be booked per NIC on the same travel date.");
            }

            var booking = new Bookings
            {
                Nic = bookingDto.Nic,
                TrainNo = bookingDto.TrainNo,
                SourceStation = bookingDto.SourceStation,
                DestinationStation = bookingDto.DestinationStation,
                TravelDate = bookingDto.TravelDate,
                BookedSeats = bookingDto.BookedSeats
            };

            _db.Booking.Add(booking);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.BookingId }, bookingDto);
        }

        // GET: api/BookingAPI/GetBookingsByDateAndBus
        [HttpGet("GetBookingsByDateAndTrain")]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookingsByDateAndBus(DateTime travelDate, string trainNo)
        {
            // Validate if travel date and train number are provided
            if (string.IsNullOrEmpty(trainNo))
            {
                return BadRequest("Bus number is required.");
            }

            // Retrieve bookings matching the provided travel date and train number
            var bookings = await _db.Booking
                .Where(b => b.TravelDate.Date == travelDate.Date && b.TrainNo == trainNo)
                .Select(b => new BookingDto
                {
                    BookingId = b.BookingId,
                    Nic = b.Nic,
                    TrainNo = b.TrainNo,
                    SourceStation = b.SourceStation,
                    DestinationStation = b.DestinationStation,
                    TravelDate = b.TravelDate,
                    BookedSeats = b.BookedSeats
                })
                .ToListAsync();

            if (bookings.Count == 0)
            {
                return NotFound("No bookings found for the provided travel date and train number.");
            }

            return Ok(bookings);
        }



        // PUT: api/BookingAPI/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, BookingDto bookingDto)
        {
            if (id != bookingDto.BookingId)
            {
                return BadRequest();
            }

            // Validate if NIC number is provided and not exceeding the maximum allowed seats
            if (string.IsNullOrEmpty(bookingDto.Nic) || bookingDto.BookedSeats.Count > 5)
            {
                return BadRequest("NIC number is required and maximum 5 seats can be booked per NIC.");
            }

            var booking = await _db.Booking.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            // Update the booking properties
            booking.Nic = bookingDto.Nic;
            booking.TrainNo = bookingDto.TrainNo;
            booking.SourceStation = bookingDto.SourceStation;
            booking.DestinationStation = bookingDto.DestinationStation;
            booking.TravelDate = bookingDto.TravelDate;
            booking.BookedSeats = bookingDto.BookedSeats;

            _db.Entry(booking).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/BookingAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _db.Booking.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _db.Booking.Remove(booking);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return _db.Booking.Any(e => e.BookingId == id);
        }
    }
}
