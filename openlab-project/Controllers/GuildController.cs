using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using openlab_project;
using openlab_project.Data;
using openlab_project.Models;
using System;
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
        public class GuildJoinRequest
        {
            public int GuildId { get; set; }
        }
        [HttpDelete("leave/{guildId}")]
        public ActionResult<GuildDTO> LeaveGuild(int guildId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = _context.ApplicationUsers.Include(u => u.GuildInfo).FirstOrDefault(u => u.Id == userId);
                GuildInfo guild = _context.Guild.Where(g => g.GuildId == guildId).FirstOrDefault();


                if (user != null && user.GuildInfo != null && user.GuildInfo.GuildId == guildId)
                {

                    user.GuildInfo = null;
                    _context.SaveChanges();
                    var info = new GuildDTO
                    {
                        GuildId = guildId,
                        GuildName = guild.GuildName,
                        Description = guild.Description,
                        MembersCount = guild.MembersCount,
                        MaxMembersCount = guild.MaxMembersCount,
                        MemberNames = GetGuildMemberNames(guildId)
                    };
                    return Ok(info);
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
        [HttpPut("join/{guildId}")]
        public ActionResult<GuildDTO> JoinGuild(int guildId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = _context.ApplicationUsers.Include(u => u.GuildInfo).FirstOrDefault(u => u.Id == userId);
                GuildInfo guild = _context.Guild.Where(g => g.GuildId == guildId).FirstOrDefault();


                if (user != null && user.GuildInfo == null)
                {

                    user.GuildInfo = guild;
                    _context.SaveChanges();
                    var info = new GuildDTO
                    {
                        GuildId = guildId,
                        GuildName = guild.GuildName,
                        Description = guild.Description,
                        MembersCount = guild.MembersCount,
                        MaxMembersCount = guild.MaxMembersCount,
                        MemberNames = GetGuildMemberNames(guildId)
                    };
                    return Ok(info);
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
            GuildInfo guild = _context.Guild.Where(g => g.GuildId == guildId).FirstOrDefault();

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
        [HttpPut("create")]
        public ActionResult<GuildDTO> CreateGuild([FromBody] GuildDTO guildDTO)
        {
            try
            {
                // Assuming you are using Entity Framework DbContext named ApplicationDbContext
                using (var context = _context)
                {
                    // Create a new GuildInfo entity from GuildDTO
                    var newGuild = new GuildInfo
                    {
                        GuildName = guildDTO.GuildName,
                        MaxMembersCount = guildDTO.MaxMembersCount,
                        Description = guildDTO.Description
                        // MembersCount will default to 0, so no need to set it explicitly
                    };

                    // Add the newGuild to the context and save changes
                    context.Guild.Add(newGuild);
                    context.SaveChanges();

                    var info = new CreateGuildDTO
                    {
                        GuildName = newGuild.GuildName,
                        Description = newGuild.Description,
                        MaxMembersCount = newGuild.MaxMembersCount,
                    };

                    return Ok(info);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = "Internal server error." });
            }
        }

    }
}