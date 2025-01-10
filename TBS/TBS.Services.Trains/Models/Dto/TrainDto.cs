namespace Services.Trains.Models.Dto
{
    public class BusDto
    {
        public int TrainId { get; set; }

        public string TrainNo { get; set; }

        // Representing seat availability
        public List<string> AvailableSeats { get; set; }

        // Representing the list of train stops
        public List<string> TrainStops { get; set; }
    }
}
