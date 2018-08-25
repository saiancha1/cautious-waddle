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

        public void EditJob(Job job)
        {
            _context.Jobs.Update(job);
            _context.SaveChanges();
        }
    }
}