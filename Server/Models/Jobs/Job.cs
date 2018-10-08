using System;
using Newtonsoft.Json;

namespace cautious_waddle.Models
{
    public class Job
    {
        public int? JobId { get; set; }
        public int IsApproved { get; set; }
        public int Expired { get; set; }
        public string UserId { get; set; }
        public int? CompanyId { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public int Salary { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public string CompanyName { get; set; }
        public string WorkType { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdate { get; set; }
        public DateTime Expiry { get; set; }
    }
}