using System;

namespace cautious_waddle.Models
{
    public class Listing
    {
        public int ListingId { get; set; }
        public DateTime CreationDate { get; set; }
        public string ListingType { get; set; }
        public int LinkId { get; set; }
        public DateTime LastUpdate { get; set; }
        public DateTime Reminder { get; set; }
    }
}