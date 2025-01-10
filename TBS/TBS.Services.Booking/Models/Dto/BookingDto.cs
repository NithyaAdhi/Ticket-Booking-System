namespace Services.Booking.Models.Dto
{
    public class BookingDto
    {
        public int BookingId { get; set; }

        public string Nic { get; set; }

        public string TrainNo { get; set; }

        public string SourceStation { get; set; }

        public string DestinationStation { get; set; }

        public DateTime TravelDate { get; set; }
        public List<string> BookedSeats { get; set; }
    }
}
