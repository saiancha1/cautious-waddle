using System;
using Newtonsoft.Json;

namespace cautious_waddle.ViewModels
{
    public class EventsViewModel
    {
        [JsonProperty("eventId")]
        public int? EventId { get; set; }
        [JsonProperty("eventName")]
        public String EventName { get; set; }
        [JsonProperty("startDate")]
        public DateTime StartDate { get; set; }
        [JsonProperty("duration")]
        public TimeSpan Duration { get; set; }
        [JsonProperty("eventDescription")]
        public String EventDescription { get; set; }
        [JsonProperty("eventLocation")]
        public String EventLocation { get; set; }
    }
}