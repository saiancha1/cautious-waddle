using Newtonsoft.Json;
using System.Collections.Generic;
using cautious_waddle.Models;

namespace cautious_waddle.ViewModels
{
    public class CompaniesViewModel
    {
        [JsonProperty("companyId")]
        public int? CompanyId { get; set; }
        [JsonProperty("users")]
        public List<CompanyUser> Users { get; set; }
        [JsonProperty("contactEmail")]
        public string ContactEmail { get; set; }
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
        [JsonProperty("companyDesc")]
        public string CompanyDesc { get; set; }
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