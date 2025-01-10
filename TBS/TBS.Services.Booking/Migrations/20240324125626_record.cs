using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Booking.Migrations
{
    /// <inheritdoc />
    public partial class record : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Booking",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RootCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SourceStation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DestinationStation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TravelDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BookedSeats = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booking", x => x.BookingId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Booking");
        }
    }
}
