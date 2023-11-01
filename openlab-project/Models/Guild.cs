using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;

namespace openlab_project.Models
{
    public class Guild
    {
        [Key]
        public int GuildId { get; set; }
        public string? GuildName { get; set; }
        public int MaxMembersCount { get; set; }
        public string? Description { get; set; }

        public ICollection<ApplicationUser>? users { get; }
    }
}
