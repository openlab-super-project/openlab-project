using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace openlab_project.Data.Migrations
{
    /// <inheritdoc />
    public partial class addXPandGuildName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Guildname",
                table: "Guilds",
                newName: "GuildName");

            migrationBuilder.AddColumn<string>(
                name: "GN",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "xp",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GN",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "xp",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "GuildName",
                table: "Guilds",
                newName: "Guildname");
        }
    }
}
