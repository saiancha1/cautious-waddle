using System;
using Newtonsoft.Json;

namespace cautious_waddle.Models
{
    public class Job
    {
        [JsonProperty("id")]
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
        [JsonProperty("expirey")]
        public DateTime Expirey { get; set; }
    }
}