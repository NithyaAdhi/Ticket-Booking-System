using Microsoft.EntityFrameworkCore;
using Services.Trains.Models;

namespace Services.Trains.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Bus> Trains { get; set; }
    }
}
