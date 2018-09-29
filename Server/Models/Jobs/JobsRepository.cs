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

            // Search
            if(search != null) {
                jobs = jobs.Where(j => j.JobTitle.ToLower().Contains(search.ToLower()) || j.JobDescription.ToLower().Contains(search.ToLower()));
            }

            // Filtering
            jobs = jobs.Where(j => j.Salary >= minSalary);
            if(maxSalary != 0) {
                jobs = jobs.Where(j => j.Salary <= maxSalary);
            }

            IEnumerable<JobsViewModel> jobsViewModel = Mapper.Map<IEnumerable<Job>, IEnumerable<JobsViewModel>>(_context.Jobs);

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

        public void EditJob(JobsViewModel job)
        {
            Job oldJob = GetJobById(job.JobId.Value);
            _context.Jobs.Attach(oldJob);

            oldJob.LastUpdate     = DateTime.Now;
            oldJob.JobTitle       = job.JobTitle;
            oldJob.JobDescription = job.JobDescription;
            oldJob.Salary         = job.Salary;

            _context.SaveChanges();
        }

        public void ExpiredJobs()
        {
            Console.WriteLine("***\n***\n***ExpiredJobs***\n***\n***");
            // Get jobs that are not expired already
            List<Job> jobs = _context.Jobs.Where(j => j.Expired == 0).ToList();
            DateTime current = DateTime.Now;

            for(int j = 0; j < jobs.Count; j++)
            {
                Job job = jobs[j];
                
                if(job.Expiry < current)
                {
                    // Mark the job as expired
                    _context.Jobs.Attach(job);
                    job.Expired = 1;
                    _context.SaveChanges();
                }
            }
        }
    }
}