using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IMailingListRepository
    {
        void subscribe(MailingList_EmailAddress emailAddress);
        IEnumerable<MailingList_EmailAddress> getMailingList();
        string formMessage();
        void MailingListWeekly();
    }
}