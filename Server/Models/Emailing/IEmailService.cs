using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IEmailService
    {
        void Send(EmailMessage emailMessage);
        string formMessage();
        void MailingListWeekly();
        void ListingAdded(string subject, string content);
        IEnumerable<MailingList_EmailAddress> GetEmailAddresses();
    }
}