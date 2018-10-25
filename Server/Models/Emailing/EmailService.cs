using System;
using System.Collections.Generic;
using System.Linq;

using MailKit.Net.Smtp;
using MailKit.Security;

using MimeKit;
using MimeKit.Text;
using MimeKit.Cryptography;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public class EmailService : IEmailService
    {
        private MailingListDbContext _context;
        private readonly IEmailConfiguration _emailConfiguration;
        private IJobsRepository _jobsRepository;
        private ILocalEventsRepository _localEventsRepository;

        public EmailService(MailingListDbContext context ,IEmailConfiguration emailConfiguration, IJobsRepository jobsRepository, ILocalEventsRepository localEventsRepository)
        {
            _context = context;
            _emailConfiguration = emailConfiguration;
            _jobsRepository = jobsRepository;
            _localEventsRepository = localEventsRepository;
        }

        public void Send(EmailMessage emailMessage)
        {
            var message = new MimeMessage();
            message.To.AddRange(emailMessage.ToAddresses.Select(x => new MailboxAddress(x.FullName, x.EmailAddress)));
            message.From.AddRange(emailMessage.FromAddresses.Select(x => new MailboxAddress(x.FullName, x.EmailAddress)));
        
            message.Subject = emailMessage.Subject;
            //We will say we are sending HTML. But there are options for plaintext etc. 
            message.Body = new TextPart("plain")
            {
                Text = @emailMessage.Content
            };
        
            //Be careful that the SmtpClient class is the one from Mailkit not the framework!
            using (var emailClient = new SmtpClient())
            {
                emailClient.ServerCertificateValidationCallback = (s, c, h, e) => true;

                //The last parameter here is to use SSL (Which you should!)
                emailClient.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.SmtpPort, false);
        
                //Remove any OAuth functionality as we won't be using it. 
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");
        
                emailClient.Authenticate(_emailConfiguration.SmtpUsername, _emailConfiguration.SmtpPassword);

                emailClient.Send(message);
        
                emailClient.Disconnect(true);
            }
        }

        public void SendToAdmins(string subject, string content)
        {
            EmailMessage emailMessage = new EmailMessage();

            // From email address
            Emailing_EmailAddress from = new Emailing_EmailAddress();
            from.FullName = "Admin@TechPalmy.com";
            from.EmailAddress = _emailConfiguration.SmtpUsername;

            // To email addresses (Admin email addresses)
            List<Emailing_EmailAddress> addresses = _emailConfiguration.adminEmailAddresses;

            emailMessage.FromAddresses.Add(from);
            emailMessage.ToAddresses = addresses;
            emailMessage.Subject = subject;
            emailMessage.Content = content;

            Send(emailMessage);
        }
    }
}