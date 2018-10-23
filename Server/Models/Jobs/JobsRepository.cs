using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public class JobsRepository : IJobsRepository
    {
        private JobsDbContext _context;
        public IEnumerable<Job> _jobs => _context.Jobs;

        public JobsRepository(JobsDbContext context) 
        {
            _context = context;
        }

        public IEnumerable<JobsViewModel> GetJobsList(int minSalary, int maxSalary, string search)
        {
            IEnumerable<Job> jobs = _context.Jobs;

            // Only return jobs that are not expired and have been approved
            jobs = jobs.Where(j => j.Expired == 0 && j.IsApproved == 1);

            // Search
            if(search != null) {
                jobs = jobs.Where(j => j.JobTitle.ToLower().Contains(search.ToLower()) || j.JobDescription.ToLower().Contains(search.ToLower()));
            }

            // Filtering
            jobs = jobs.Where(j => j.Salary >= minSalary);
            if(maxSalary != 0) {
                jobs = jobs.Where(j => j.Salary <= maxSalary);
            }

            IEnumerable<JobsViewModel> jobsViewModel = Mapper.Map<IEnumerable<Job>, IEnumerable<JobsViewModel>>(jobs);

            return jobsViewModel;
        }

        public IEnumerable<JobsViewModel> AdminGetJobs(bool? expired, bool? approved)
        {
            IEnumerable<Job> jobs = _context.Jobs;

            if(expired != null)
            {
                jobs = expired == true ? jobs.Where(j => j.Expired == 1) : jobs.Where(j => j.Expired == 0);
            }
            if(approved != null)
            {
                jobs = approved == true ? jobs.Where(j => j.IsApproved == 1) : jobs.Where(j => j.IsApproved == 0);
            }

            IEnumerable<JobsViewModel> jobsViewModel = Mapper.Map<IEnumerable<Job>, IEnumerable<JobsViewModel>>(jobs);

            return jobsViewModel;
        }

        public IEnumerable<JobsViewModel> GetMyJobs(string userId, bool? expired, bool? approved)
        {
            IEnumerable<Job> jobs = _context.Jobs.Where(j => j.UserId == userId);

            if(expired != null)
            {
                jobs = expired == true ? jobs.Where(j => j.Expired == 1) : jobs.Where(j => j.Expired == 0);
            }
            if(approved != null)
            {
                jobs = approved == true ? jobs.Where(j => j.IsApproved == 1) : jobs.Where(j => j.IsApproved == 0);
            }

            IEnumerable<JobsViewModel> jobsViewModel = Mapper.Map<IEnumerable<Job>, IEnumerable<JobsViewModel>>(jobs);

            return jobsViewModel;
        }

        public void AddJob(Job job)
        {
            _context.Jobs.Add(job);
            _context.SaveChanges();
        }

        public Job GetJobById(int id)
        {
            return _context.Jobs.SingleOrDefault(j => j.JobId == id);
        }

        public void DeleteJob(Job job)
        {
            _context.Jobs.Remove(job);
            _context.SaveChanges();
        }

        public void DeleteMyJobs(string userId)
        {
            IEnumerable<JobsViewModel> myJobs = GetMyJobs(userId, null, null);

            foreach(JobsViewModel jobViewModel in myJobs)
            {
                Job job = GetJobById(jobViewModel.JobId.Value);
                DeleteJob(job);
            }
        }

        public void EditJob(JobsViewModel job)
        {
            Job oldJob = GetJobById(job.JobId.Value);
            _context.Jobs.Attach(oldJob);

            oldJob.LastUpdate       = DateTime.Now;
            oldJob.CompanyId        = job.CompanyId;
            oldJob.JobTitle         = job.JobTitle;
            oldJob.JobDescription   = job.JobDescription;
            oldJob.Salary           = job.Salary;
            oldJob.ContactFirstName = job.ContactFirstName;
            oldJob.ContactLastName  = job.ContactLastName;
            oldJob.ContactEmail     = job.ContactEmail;
            oldJob.ContactPhone     = job.ContactPhone;
            oldJob.CompanyName      = job.CompanyName;
            oldJob.WorkType         = job.WorkType;

            _context.SaveChanges();
        }

        public void ExpiredJob(Job job)
        {
            // Mark the job as expired
            _context.Jobs.Attach(job);
            job.Expired = 1;
            _context.SaveChanges();
        }

        public void ExpiredJobs()
        {
            // Get jobs that are not expired already
            List<Job> jobs = _context.Jobs.Where(j => j.Expired == 0).ToList();
            DateTime current = DateTime.Now;

            for(int j = 0; j < jobs.Count; j++)
            {
                Job job = jobs[j];

                if(job.Expiry < current)
                {
                    ExpiredJob(job);
                }
            }
        }

        public void approveJob(int id)
        {
            Job job = GetJobById(id);
            _context.Jobs.Attach(job);
            job.IsApproved = 1;
            _context.SaveChanges();
        }

        public void disapproveJob(int id)
        {
            Job job = GetJobById(id);
            _context.Jobs.Attach(job);
            job.IsApproved = 0;
            _context.SaveChanges();
        }
    }
}