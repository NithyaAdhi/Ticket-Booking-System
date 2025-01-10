using Microsoft.EntityFrameworkCore;
using Services.Admin.Models;
using static Azure.Core.HttpHeader;

namespace Services.Admin.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Admins> Admin { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Admins>().HasData(new Admins { AdminId = 1, Username = "Admin1", Email = "admin1@gmail.com", Password = "admin1" });
            modelBuilder.Entity<Admins>().HasData(new Admins { AdminId = 2, Username = "Admin2", Email = "admin2@gmail.com", Password = "admin2" });
        }
    }
}
