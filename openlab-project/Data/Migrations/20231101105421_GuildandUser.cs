using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace openlab_project.Data.Migrations
{
    /// <inheritdoc />
    public partial class GuildandUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "XP",
                table: "Guilds",
                newName: "MaxMembersCount");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Guilds",
                newName: "GuildId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Guilds",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GuildId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GuildsId",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GuildId",
                table: "AspNetUsers",
                column: "GuildId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Guilds_GuildId",
                table: "AspNetUsers",
                column: "GuildId",
                principalTable: "Guilds",
                principalColumn: "GuildId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Guilds_GuildId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GuildId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Guilds");

            migrationBuilder.DropColumn(
                name: "GuildId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GuildsId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "MaxMembersCount",
                table: "Guilds",
                newName: "XP");

            migrationBuilder.RenameColumn(
                name: "GuildId",
                table: "Guilds",
                newName: "Id");
        }
    }
}
