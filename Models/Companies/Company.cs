using System.Collections.Generic;
using Newtonsoft.Json;

namespace cautious_waddle.Models
{
    public class Company
    {
        [JsonProperty("id")]
        public int? CompanyId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("mailingListEmail")]
        public string MailingListEmail { get; set; }
        [JsonProperty("logo")]
        public string Logo { get; set; }
        [JsonProperty("size")]
        public int Size { get; set; }
        [JsonProperty("businessType")]
        public string BusinessType { get; set; }
        [JsonProperty("specialistArea")]
        public string SpecialistArea { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
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
        [JsonProperty("users")]
        public List<CompanyUser> Users { get; set; }
    }
}