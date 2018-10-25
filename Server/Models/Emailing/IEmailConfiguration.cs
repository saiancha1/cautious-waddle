using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IEmailConfiguration
    {
        string SmtpServer { get; }
        int SmtpPort { get; }
        string SmtpUsername { get; set; }
        string SmtpPassword { get; set; }
        List<Emailing_EmailAddress> adminEmailAddresses { get; set; }
    }
}