using System.Collections.Generic;
using Newtonsoft.Json;
using System;

namespace cautious_waddle.Models
{
    public class Company
    {
        [JsonProperty("id")]
        public int? CompanyId { get; set; }
        [JsonProperty("isApproved")]
        public int IsApproved { get; set; }
        [JsonProperty("creationDate")]
        public DateTime CreationDate { get; set; }
        [JsonProperty("lastUpdate")]
        public DateTime LastUpdate { get; set; }
        [JsonProperty("reminderDate")]
        public DateTime ReminderDate { get; set; }
        [JsonProperty("contactEmail")]
        public string ContactEmail { get; set; }
        [JsonProperty("users")]
        public List<CompanyUser> Users { get; set; }
        [JsonProperty("companyName")]
        public string CompanyName { get; set; }
        [JsonProperty("logo")]
        public string Logo { get; set; }
        [JsonProperty("size")]
        public int Size { get; set; }
        [JsonProperty("businessType")]
        public string BusinessType { get; set; }
        [JsonProperty("specialistArea")]
        public string SpecialistArea { get; set; }
        [JsonProperty("companyDescription")]
        public string CompanyDescription { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("address1")]
        public string Address1 { get; set; }
        [JsonProperty("address2")]
        public string Address2 { get; set; }
        [JsonProperty("suburb")]
        public string Suburb { get; set; }
        [JsonProperty("postalCode")]
        public string PostalCode { get; set; }
        [JsonProperty("city")]
        public string City { get; set; }
        [JsonProperty("country")]
        public string Country { get; set; }
        [JsonProperty("summerJobs")]
        public int SummerJobs { get; set; }
       
    }
}