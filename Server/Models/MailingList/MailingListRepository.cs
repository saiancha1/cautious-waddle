using System;
using System.Collections.Generic;
using System.Linq;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public class MailingListRepository : IMailingListRepository
    {
        private MailingListDbContext _context;
        private IJobsRepository _jobsRepository;
        private ILocalEventsRepository _localEventsRepository;
        private IEmailConfiguration _emailConfiguration;
        private IEmailService _emailService;

        public MailingListRepository(MailingListDbContext context, IJobsRepository jobsRepository, ILocalEventsRepository localEventsRepository,
        IEmailConfiguration emailConfiguration, IEmailService emailService)
        {
            _context = context;
            _jobsRepository = jobsRepository;
            _localEventsRepository = localEventsRepository;
            _emailConfiguration = emailConfiguration;
            _emailService = emailService;
        }

        public IEnumerable<MailingList_EmailAddress> getMailingList()
        {
            IEnumerable<MailingList_EmailAddress> emailAddresses = _context.MailingList;
            return emailAddresses;
        }

        public string formMessage()
        {
            string content = "";

            // Write content for jobs
            content += "Local jobs:";
            List<JobsViewModel> jobs = _jobsRepository.GetJobsList(0, 0, null).ToList();
            foreach(JobsViewModel job in jobs)
            {
                content += "\n\n" + job.JobTitle + "\n" + job.JobDescription;
            }

            // Write content for events
            content += "\n\nLocal events:";
            List<LocalEventsViewModel> localEvents = _localEventsRepository.GetEvents().ToList();
            foreach(LocalEventsViewModel localEvent in localEvents)
            {
                content += "\n\n" + localEvent.EventName + "\n" + localEvent.EventDescription;
            }

            return content;
        }

        public void MailingListWeekly()
        {
            EmailMessage emailMessage = new EmailMessage();

            // From email address
            MailingList_EmailAddress from = new MailingList_EmailAddress();
            from.FullName = "Admin@TechPalmy.com";
            from.EmailAddress = _emailConfiguration.SmtpUsername;

            // Send email to all email addresses on the mailing list
            List<MailingList_EmailAddress> mailingList = _context.MailingList.ToList();
            emailMessage.ToAddresses = mailingList;

            emailMessage.FromAddresses.Add(from);
            emailMessage.Subject = "Weekly mailing list";
            emailMessage.Content = formMessage();

            _emailService.Send(emailMessage);
        }

        public void subscribe(MailingList_EmailAddress emailAddress)
        {
            _context.MailingList.Add(emailAddress);
            _context.SaveChanges();
        }
    }
}