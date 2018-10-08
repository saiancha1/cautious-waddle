using System;
using Newtonsoft.Json;

namespace cautious_waddle.ViewModels
{
    public class JobsViewModel
    {
        [JsonProperty("jobId")]
        public int? JobId { get; set; }
        [JsonProperty("userId")]
        public string UserId { get; set; }
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }
        [JsonProperty("jobTitle")]
        public string JobTitle { get; set; }
        [JsonProperty("jobDescription")]
        public string JobDescription { get; set; }
        [JsonProperty("salary")]
        public int Salary { get; set; }
        [JsonProperty("contactFirstName")]
        public string ContactFirstName { get; set; }
        [JsonProperty("contactLastName")]
        public string ContactLastName { get; set; }
        [JsonProperty("contactEmail")]
        public string ContactEmail { get; set; }
        [JsonProperty("contactPhone")]
        public string ContactPhone { get; set; }
        [JsonProperty("companyName")]
        public string CompanyName { get; set; }
        [JsonProperty("workType")]
        public string WorkType { get; set; }
        [JsonProperty("expiry")]
        public DateTime Expiry { get; set; }

        [JsonProperty("isApproved")]
        public int IsApproved {get; set;}
    }
}