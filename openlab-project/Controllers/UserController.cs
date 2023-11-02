using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using openlab_project.Data;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace openlab_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<UserDTO> Get()
        {
            var currentUser = GetCurrentUser();
            var info = new UserDTO()
            {
                XP = currentUser.xp,
                Guild = currentUser.GuildInfo?.GuildName,
            };
            return info;
            
        }

        private Models.ApplicationUser GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Models.ApplicationUser? user = _context.Users
            .Include(user=> user.GuildInfo)
            .SingleOrDefault(user => user.Id == userId);

            return user;
        }
    }
}