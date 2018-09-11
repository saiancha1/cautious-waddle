using System;

namespace cautious_waddle.Models
{
    public class Event
    {
        public int? EventId { get; set; }
        public int UserId { get; set; }
        public int IsApproved { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdate { get; set; }
        public String EventName { get; set; }
        public DateTime StartDate { get; set; }
        public TimeSpan Duration { get; set; }
        public String EventDescription { get; set; }
        public String EventLocation { get; set; }

    }
}