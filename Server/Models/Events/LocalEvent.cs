using System;
using System.ComponentModel.DataAnnotations;

namespace cautious_waddle.Models
{
    public class LocalEvent
    {
        [Key]
        public int? EventId { get; set; }
        public string UserId { get; set; }
        public int IsApproved { get; set; }
        
        public DateTime CreationDate { get; set; }
        public DateTime LastUpdate { get; set; }
        public string EventName { get; set; }
        public DateTime StartDate { get; set; }
        public int? Duration { get; set; }
        public string EventDescription { get; set; }
        public string EventLocation { get; set; }

        public string EventUrl {get;set;}

    }
}