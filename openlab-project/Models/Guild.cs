using System.ComponentModel.DataAnnotations;

namespace openlab_project.Models
{
    public class Guild
    {
        [Key]
        public int Id { get; set; }
        public string? Guildname { get; set; }
        public int XP { get; set; }
    }
}
