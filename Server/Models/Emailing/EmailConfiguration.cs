using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public class EmailConfiguration : IEmailConfiguration
    {
        public string SmtpServer { get; set; }
        public int SmtpPort  { get; set; }
        public string SmtpUsername { get; set; }
        public string SmtpPassword { get; set; }
        public List<Emailing_EmailAddress> adminEmailAddresses { get; set; }
    }
}