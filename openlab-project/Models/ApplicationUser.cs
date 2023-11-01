using Microsoft.AspNetCore.Identity;
using System.Reflection.Metadata;

namespace openlab_project.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? GN { get; set; }
        public int xp { get; set; }

        public Guild? Guild { get; set; }
        public int GuildsId { get; set; }
    }
}