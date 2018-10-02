using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public class EmailMessage
    {
        public EmailMessage()
        {
            ToAddresses = new List<MailingList_EmailAddress>();
            FromAddresses = new List<MailingList_EmailAddress>();
        }

        public List<MailingList_EmailAddress> ToAddresses { get; set; }
        public List<MailingList_EmailAddress> FromAddresses { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
    }
}