using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace openlab_project.Data.Migrations
{
    /// <inheritdoc />
    public partial class GuildAndUser1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Guilds_GuildInfoGuildId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Guilds",
                table: "Guilds");

            migrationBuilder.RenameTable(
                name: "Guilds",
                newName: "Guild");

            migrationBuilder.AddColumn<int>(
                name: "MemberCount",
                table: "Guild",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Guild",
                table: "Guild",
                column: "GuildId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Guild_GuildInfoGuildId",
                table: "AspNetUsers",
                column: "GuildInfoGuildId",
                principalTable: "Guild",
                principalColumn: "GuildId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Guild_GuildInfoGuildId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Guild",
                table: "Guild");

            migrationBuilder.DropColumn(
                name: "MemberCount",
                table: "Guild");

            migrationBuilder.RenameTable(
                name: "Guild",
                newName: "Guilds");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Guilds",
                table: "Guilds",
                column: "GuildId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Guilds_GuildInfoGuildId",
                table: "AspNetUsers",
                column: "GuildInfoGuildId",
                principalTable: "Guilds",
                principalColumn: "GuildId");
        }
    }
}
