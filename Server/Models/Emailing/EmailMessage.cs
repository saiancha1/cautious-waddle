using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public class EmailMessage
    {
        public EmailMessage()
        {
            ToAddress = new List<EmailAddress>();
            FromAddress = new List<EmailAddress>();
        }

        public List<EmailAddress> ToAddress { get; set; }
        public List<EmailAddress> FromAddress { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
}