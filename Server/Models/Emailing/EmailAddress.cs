using Newtonsoft.Json;

namespace cautious_waddle.Models
{
    public class EmailAddress
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("address")]
        public string Address { get; set; }
    }
}