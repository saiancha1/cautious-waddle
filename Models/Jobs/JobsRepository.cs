using System.Collections.Generic;
using System.Linq;

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

        public IEnumerable<Job> GetJobsList(int minSalary, int maxSalary, string search)
        {
            IEnumerable<Job> jobs = _jobs;

            // Search
            if(search != null) {
                jobs = jobs.Where(j => j.JobTitle.ToLower().Contains(search.ToLower()) || j.JobDescription.ToLower().Contains(search.ToLower()));
            }

            // Filtering
            jobs = jobs.Where(j => j.Salary >= minSalary);
            if(maxSalary != 0) {
                jobs = jobs.Where(j => j.Salary <= maxSalary);
            }

            return jobs;
        }

        public void AddJob(Job job)
        {
            _context.Jobs.Add(job);
            _context.SaveChanges();
        }

        public Job GetJobById(int id)
        {
            return _context.Jobs.SingleOrDefault(j => j.JobId == id);;
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