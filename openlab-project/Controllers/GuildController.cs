using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using openlab_project;
using openlab_project.Data;
using openlab_project.Models;
using System.Security.Claims;

namespace OpenLabProject1.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class GuildController : Controller
    {
        private readonly ApplicationDbContext _context;

        public GuildController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<GuildDTO> GetGuildInformation()
        {
            IEnumerable<GuildInfo> dbGuilds = _context.Guild;

            return dbGuilds.Select(dbGuilds => new GuildDTO
            {
                GuildId = dbGuilds.GuildId,
                GuildName = dbGuilds.GuildName,
                Description = dbGuilds.Description,
                MaxMembersCount = dbGuilds.MaxMembersCount,
                MembersCount = GetguildMembersCount(dbGuilds.GuildId),
                MemberNames = GetGuildMemberNames(dbGuilds.GuildId)
            });
        }


        private int GetguildMembersCount(int guildId)
        {
            IQueryable<ApplicationUser> users = _context.Users.Include(applicationUser => applicationUser.GuildInfo).AsNoTracking();

            return users.Where(u => u.GuildInfo.GuildId == guildId).Count();
        }
        private List<string> GetGuildMemberNames(int guildId)
        {
            IQueryable<ApplicationUser> users = _context.Users.Include(applicationUser => applicationUser.GuildInfo).AsNoTracking();
            return users.Where(u => u.GuildInfo.GuildId == guildId).Select(u => u.UserName).ToList();
        }
        [HttpPost("join/")]
        public IActionResult JoinGuild([FromBody] GuildJoinRequest request)
        {
            int guildId = request.GuildId;
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = _context.ApplicationUsers.Include(u => u.GuildInfo).FirstOrDefault(u => u.Id == userId);

                var guild = _context.Guild.FirstOrDefault(g => g.GuildId == guildId);

                if (user != null && user.GuildInfo != null)
                {
                    return BadRequest(new { message = "You are already a member of a guild." });
                }


                if (user == null || guild == null)
                {
                    return NotFound(new { message = "User or guild not found." });
                }

                if (guild.Members.Count >= guild.MaxMembersCount)
                {
                    return BadRequest(new { message = "Guild is already full." });
                }

                user.GuildInfo = guild;
                _context.SaveChanges();

                UpdateUserGuildId(userId, guildId);

                Console.WriteLine($"Joining guild with ID: {request.GuildId}");
                return Ok(new { message = "Successfully joined guild." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error." });
            }
        }
        public class GuildJoinRequest
        {
            public int GuildId { get; set; }
        }
        [HttpDelete("leave/{guildId}")]
        public IActionResult LeaveGuild(int guildId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = _context.ApplicationUsers.Include(u => u.GuildInfo).FirstOrDefault(u => u.Id == userId);

                if (user != null && user.GuildInfo != null && user.GuildInfo.GuildId == guildId)
                {

                    user.GuildInfo = null;
                    _context.SaveChanges();
                    return Ok(new { message = "Successfully left the guild." });
                }
                else
                {
                    return BadRequest(new { message = "User is not a member of the specified guild." });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error." });
            }
        }
        private void UpdateUserGuildId(string userId, int guildId)
        {
            var user = _context.ApplicationUsers.FirstOrDefault(u => u.Id == userId);

            if (user != null)
            {
                user.GuildInfo = new GuildInfo { GuildId = guildId };
                _context.SaveChanges();
            }
        }
        [HttpGet]
        [Route("getGuildInfo")]
        public GuildDTO getGuildInfo(int guildId)
        {
            GuildInfo guild = _context.Guild.Where(g => g.GuildId== guildId).FirstOrDefault();

            var info = new GuildDTO
            {
                GuildId = guildId,
                GuildName = guild.GuildName,
                Description = guild.Description,
                MembersCount = guild.MembersCount,
                MaxMembersCount = guild.MaxMembersCount,
                MemberNames = GetGuildMemberNames(guildId)
            };
            return info;
        }

    }
}