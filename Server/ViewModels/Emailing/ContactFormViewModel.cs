using Newtonsoft.Json;

namespace cautious_waddle.ViewModels
{
    public class ContactFormViewModel
    {
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("emailAddress")]
        public string EmailAddress { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}