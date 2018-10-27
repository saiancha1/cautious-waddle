using cautious_waddle.Models;

using System.Collections.Generic;

using Newtonsoft.Json;

namespace cautious_waddle.ViewModels
{
    public class EmailMessageViewModel
    {
        [JsonProperty("toAddresses")]
        public List<Emailing_EmailAddress> ToAddresses { get; set; }
        [JsonProperty("subject")]
        public string Subject { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
    }
}