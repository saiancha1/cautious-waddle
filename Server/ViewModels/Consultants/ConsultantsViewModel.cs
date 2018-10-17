using Newtonsoft.Json;

namespace cautious_waddle.ViewModels
{
    public class ConsultantsViewModel
    {
        [JsonProperty("consultantId")]
        public int? ConsultantId { get; set; }
        [JsonProperty("isApproved")]
        public int IsApproved { get; set; }
        [JsonProperty("userId")]
        public string UserId { get; set; }
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
        [JsonProperty("imageURL")]
        public string ImageURL { get; set; }
        [JsonProperty("specialistArea")]
        public string SpecialistArea { get; set; }
        [JsonProperty("consultantDesc")]
        public string ConsultantDesc { get; set; }
        [JsonProperty("phone")]
        public string Phone { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("website")]
        public string Website { get; set; }
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
    }
}