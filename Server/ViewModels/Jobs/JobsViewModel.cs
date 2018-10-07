using System;
using Newtonsoft.Json;

namespace cautious_waddle.ViewModels
{
    public class JobsViewModel
    {
        [JsonProperty("jobId")]
        public int? JobId { get; set; }
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }
        [JsonProperty("profileId")]
        public int? ProfileId { get; set; }
        [JsonProperty("jobTitle")]
        public string JobTitle { get; set; }
        [JsonProperty("jobDescription")]
        public string JobDescription { get; set; }
        [JsonProperty("salary")]
        public int Salary { get; set; }
        [JsonProperty("expiry")]
        public DateTime Expiry { get; set; }

        [JsonProperty("isApproved")]
        public int IsApproved {get; set;}
    }
}