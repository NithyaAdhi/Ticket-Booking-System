using Microsoft.EntityFrameworkCore;
using Services.Booking.Models;

namespace Services.Booking.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Bookings> Booking { get; set; }
    }
}
