using Microsoft.AspNetCore.Identity;
using System.Reflection.Metadata;

namespace openlab_project.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int xp { get; set; }

        public GuildInfo? GuildInfo { get; set; }
    }
}