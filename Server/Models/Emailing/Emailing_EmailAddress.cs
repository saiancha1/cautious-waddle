using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace cautious_waddle.Models
{
    public class Emailing_EmailAddress
    {
        [JsonProperty("emailAddress")]
        [Key]
        public string EmailAddress { get; set; }
        [JsonProperty("fullName")]
        public string FullName { get; set; }
    }
}