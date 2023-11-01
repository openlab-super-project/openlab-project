using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace openlab_project.Data.Migrations
{
    /// <inheritdoc />
    public partial class GuildAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GuildInfoGuildId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "xp",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Guilds",
                columns: table => new
                {
                    GuildId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GuildName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MaxMembersCount = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guilds", x => x.GuildId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GuildInfoGuildId",
                table: "AspNetUsers",
                column: "GuildInfoGuildId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Guilds_GuildInfoGuildId",
                table: "AspNetUsers",
                column: "GuildInfoGuildId",
                principalTable: "Guilds",
                principalColumn: "GuildId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Guilds_GuildInfoGuildId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Guilds");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GuildInfoGuildId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GuildInfoGuildId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "xp",
                table: "AspNetUsers");
        }
    }
}
