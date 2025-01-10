using System.ComponentModel.DataAnnotations;

namespace Services.Trains.Models
{
    public class Bus
    {
        [Key]
        public int TrainId { get; set; }

        [Required]
        public string TrainNo { get; set; }

        // Representing seat availability
        public List<string> AvailableSeats { get; set; }

        // Representing the list of train stops
        public List<string> TrainStops { get; set; }
    }
}
