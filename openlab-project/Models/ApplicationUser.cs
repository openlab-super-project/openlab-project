using Microsoft.AspNetCore.Identity;

namespace openlab_project.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? GN { get; set; }
        public int xp { get; set; }
    }
}