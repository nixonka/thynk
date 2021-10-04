using Microsoft.EntityFrameworkCore.Migrations;

namespace Thynk.Persistance.Migrations
{
    public partial class ExpandedEmployeeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Hobbies",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hometown",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Job",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Motto",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PersonalBlog",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Hobbies",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Hometown",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Job",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Motto",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "PersonalBlog",
                table: "Employees");
        }
    }
}
