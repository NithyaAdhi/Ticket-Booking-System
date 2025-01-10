using System.ComponentModel.DataAnnotations;

namespace Services.Booking.Models
{
    public class Bookings
    {
        [Key]
        public int BookingId { get; set; }

        [Required]
        public string Nic { get; set; }

        [Required]
        public string TrainNo { get; set; }

        [Required]
        public string SourceStation { get; set; }

        [Required]
        public string DestinationStation { get; set; }

        [Required]
        public DateTime TravelDate { get; set; }
        public List<string> BookedSeats { get; set; }
    }
}
