using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Booking.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusNo",
                table: "Booking");

            migrationBuilder.RenameColumn(
                name: "RootCode",
                table: "Booking",
                newName: "TrainNo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TrainNo",
                table: "Booking",
                newName: "RootCode");

            migrationBuilder.AddColumn<string>(
                name: "BusNo",
                table: "Booking",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
