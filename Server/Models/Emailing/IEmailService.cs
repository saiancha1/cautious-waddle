using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IEmailService
    {
        void Send(EmailMessage emailMessage);
        List<EmailMessage> RecieveEmail(int maxCount = 10);
    }
}