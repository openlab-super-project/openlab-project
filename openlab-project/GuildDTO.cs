namespace openlab_project
{
    public class GuildDTO
    {
        public int GuildId { get; set; }
        public string? GuildName { get; set; }
        public int MaxMembersCount { get; set; }
        public int MembersCount { get; set; } = default;
        public string? Description { get; set; }
        public List<string> MemberNames { get; set; }
    }
}
