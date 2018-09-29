using System;
using Newtonsoft.Json;

namespace cautious_waddle.Models
{
    public class Job
    {
        public int? JobId { get; set; }
        public int IsApproved { get; set; }
        public int Expired { get; set; }
        public int? CompanyId { get; set; }
        public int? ProfileId { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public int Salary { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdate { get; set; }
        public DateTime Expiry { get; set; }
    }
}