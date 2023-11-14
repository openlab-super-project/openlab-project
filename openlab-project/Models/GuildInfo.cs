using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace openlab_project.Models
{
    public class GuildInfo
    {
        [Key]

        public int GuildId { get; set; }
        public string? GuildName { get; set; }
        public int MaxMembersCount { get; set; }
        public int MembersCount { get; set; } = default;
        public string? Description { get; set; }
        public ICollection<ApplicationUser>? Members { get; } = new List<ApplicationUser>();
    }
}
