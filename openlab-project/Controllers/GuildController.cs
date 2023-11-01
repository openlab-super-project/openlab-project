using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using openlab_project.Data;
using openlab_project.Models;

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
        public IEnumerable<GuildInfo> GetGuildInformation()
        {
            IEnumerable<GuildInfo> dbGuilds = _context.Guild;

            return dbGuilds.Select(dbGuilds => new GuildInfo
            {
                GuildId = dbGuilds.GuildId,
                GuildName = dbGuilds.GuildName,
                Description = dbGuilds.Description,
                MaxMembersCount = dbGuilds.MaxMembersCount,
                MembersCount = GetguildMembersCount(dbGuilds.GuildId)
            });
        }


        private int GetguildMembersCount(int guildId)
        {
            IQueryable<ApplicationUser> users = _context.Users.Include(applicationUser => applicationUser.GuildInfo).AsNoTracking();

            return users.Where(u => u.GuildInfo.GuildId == guildId).Count();
        }

    }
}