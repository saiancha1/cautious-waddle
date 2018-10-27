using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public class EmailMessage
    {
        public EmailMessage()
        {
            ToAddresses = new List<Emailing_EmailAddress>();
            FromAddresses = new List<Emailing_EmailAddress>();
        }

        public List<Emailing_EmailAddress> ToAddresses { get; set; }
        public List<Emailing_EmailAddress> FromAddresses { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
}