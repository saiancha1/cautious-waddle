using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IMailingListRepository
    {
        void subscribe(Emailing_EmailAddress emailAddress);
        IEnumerable<Emailing_EmailAddress> getMailingList();
        string formMessage();
        void MailingListWeekly();
    }
}