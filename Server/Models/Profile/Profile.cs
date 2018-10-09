using Newtonsoft.Json;

namespace cautious_waddle.Models
{
    public class Profile
    {
        [JsonProperty("profileId")]
        public int? ProfileId { get; set; }
        [JsonProperty("userId")]
        public string UserId { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("bio")]
        public string Bio { get; set; }
    }
}