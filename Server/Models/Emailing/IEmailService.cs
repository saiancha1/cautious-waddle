using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IEmailService
    {
        void Send(EmailMessage emailMessage);
        void SendToAdmins(string subject, string content);
    }
}