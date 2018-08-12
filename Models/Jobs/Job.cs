using System;

namespace cautious_waddle.Models
{
    public class Job
    {
        public int JobId { get; set; }
        public int CompanyId { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public int Salary { get; set; }
        public DateTime Expirey { get; set; }
    }
}