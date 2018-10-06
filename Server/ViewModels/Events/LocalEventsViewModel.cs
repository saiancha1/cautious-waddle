using System;
using Newtonsoft.Json;

namespace cautious_waddle.ViewModels
{
    public class LocalEventsViewModel
    {
        [JsonProperty("eventId")]
        public int? EventId { get; set; }
        [JsonProperty("eventName")]
        public string EventName { get; set; }
        [JsonProperty("startDate")]
        public DateTime StartDate { get; set; }
        [JsonProperty("duration")]
        public int Duration { get; set; }
        [JsonProperty("eventDescription")]
        public string EventDescription { get; set; }
        [JsonProperty("eventLocation")]
        public string EventLocation { get; set; }
        [JsonProperty("imageURL")]
        public string ImageURL { get; set; }
    }
}