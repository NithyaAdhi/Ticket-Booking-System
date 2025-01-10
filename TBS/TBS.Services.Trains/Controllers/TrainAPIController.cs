using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Trains.Data;
using Services.Trains.Models;
using Services.Trains.Models.Dto;

namespace Services.Trains.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusController : ControllerBase
    {

        private readonly AppDbContext _db;

        public BusController(AppDbContext context)
        {
            _db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusDto>>> GetTrains()
        {
            var traines = await _db.Trains.Select(b => new BusDto
            {
                TrainId = b.TrainId,
                TrainNo = b.TrainNo,
                AvailableSeats = b.AvailableSeats,
                TrainStops = b.TrainStops
            }).ToListAsync();

            return Ok(traines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusDto>> GetBus(int id)
        {
            var train = await _db.Trains.FindAsync(id);

            if (train == null)
            {
                return NotFound();
            }

            var trainDto = new BusDto
            {
                TrainId = train.TrainId,
                TrainNo = train.TrainNo,
                AvailableSeats = train.AvailableSeats,
                TrainStops = train.TrainStops
            };

            return Ok(trainDto);
        }


        [HttpGet("GetTrainsByStops")]
        public async Task<ActionResult<IEnumerable<BusDto>>> GetTrainsByStops([FromQuery] string startStop, [FromQuery] string endStop)
        {
            // Convert user input to upper case for case-insensitive comparison
            if (startStop != null)
            {
                startStop = startStop.ToUpper();
                startStop = string.Join(", ", startStop.Split(',').Select(s => s.Replace("\"", "")));
            }
            if (endStop != null)
            {
                endStop = endStop.ToUpper();
                endStop = string.Join(", ", endStop.Split(',').Select(s => s.Replace("\"", "")));
            }

            // Create a list of trian stops and split the string
            var trainStopsList = new List<string>();
            if (startStop != null)
                trainStopsList.AddRange(startStop.Split(',').ToList().Distinct());
            if (endStop != null)
                trainStopsList.AddRange(endStop.Split(',').ToList().Distinct());
            trainStopsList = trainStopsList.Distinct().ToList();

            // Filter the trains based on the start and end stops
            var traines = await _db.Trains
                .Where(b => b.TrainStops.Any(bs => trainStopsList.Contains(bs.ToUpper())))
                .Select(b => new BusDto
                {
                    TrainId = b.TrainId,
                    TrainNo = b.TrainNo,
                    AvailableSeats = b.AvailableSeats,
                    TrainStops = b.TrainStops
                })
                .ToListAsync();

            return Ok(traines);
        }

        //// POST: api/TrainAPI
        //[HttpPost]
        //public async Task<ActionResult<TrainDto>> PostBus(TrainDto trainDto)
        //{
        //    var train = new Train
        //    {
        //        TrainNo = trainDto.TrainNo,
        //        AvailableSeats = trainDto.AvailableSeats,
        //        TrainStops = trainDto.TrainStops
        //    };

        //    _db.Trains.Add(train);
        //    await _db.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetBus), new { id = train.TrainId }, trainDto);
        //}

        // POST: api/BusAPI
        [HttpPost]
        public async Task<ActionResult<BusDto>> PostBus(BusDto trainDto, int numberOfSeats)
        {
            if (numberOfSeats <= 0)
            {
                return BadRequest("Number of seats must be greater than zero.");
            }

            // Generate seat numbers from "s1" to "s{numberOfSeats}"
            var availableSeats = Enumerable.Range(1, numberOfSeats).Select(i => $"s{i}").ToList();

            var train = new Bus
            {
                TrainNo = trainDto.TrainNo,
                AvailableSeats = availableSeats,
                TrainStops = trainDto.TrainStops
            };

            _db.Trains.Add(train);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBus), new { id = train.TrainId }, trainDto);
        }


        // PUT: api/TrainAPI/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBus(int id, BusDto trainDto)
        {
            if (id != trainDto.TrainId)
            {
                return BadRequest();
            }

            var train = await _db.Trains.FindAsync(id);
            if (train == null)
            {
                return NotFound();
            }

            // Update the Train properties
            train.TrainNo = trainDto.TrainNo;
            train.AvailableSeats = trainDto.AvailableSeats;
            train.TrainStops = trainDto.TrainStops;

            _db.Entry(train).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusExists(id))
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

        // DELETE: api/TrainAPI/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBus(int id)
        {
            var train = await _db.Trains.FindAsync(id);
            if (train == null)
            {
                return NotFound();
            }

            _db.Trains.Remove(train);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/TrainAPI/RemoveSeat/{id}
        [HttpDelete("RemoveSeat/{id}")]
        public async Task<IActionResult> RemoveSeat(int id, [FromQuery] string seats)
        {
            var train = await _db.Trains.FindAsync(id);
            if (train == null)
            {
                return NotFound();
            }

            if (string.IsNullOrEmpty(seats))
            {
                return BadRequest("No seats provided for removal.");
            }

            var seatsToRemove = seats.Split(',');

            foreach (var seat in seatsToRemove)
            {
                if (!train.AvailableSeats.Contains(seat))
                {
                    return BadRequest($"Seat '{seat}' not found in the train's available seats.");
                }

                train.AvailableSeats.Remove(seat);
            }

            _db.Entry(train).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainExists(id))
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



        private bool TrainExists(int id)
        {
            return _db.Trains.Any(e => e.TrainId == id);
        }

        private bool BusExists(int id)
        {
            return _db.Trains.Any(e => e.TrainId == id);
        }
    }
}
