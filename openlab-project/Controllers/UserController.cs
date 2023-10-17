using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using openlab_project.Data;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;

namespace openlab_project.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly ApplicationDbContext _context;

        public class UserInfo
        {
            public int XP { get; set; }
            public string ?
                GuildName { get; set; }
        }
        public UserController(ILogger<UserController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public ActionResult<UserInfo> Get()
        {
            var currentUser = GetCurrentUser();



            var info = new UserInfo()
            {
                XP = currentUser.xp,
                GuildName = currentUser.GN,
            
            };
            return info;
            
        }

        private Models.ApplicationUser GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Models.ApplicationUser? user = _context.Users
            .SingleOrDefault(user => user.Id == userId);

            return user;
        }
    }
}