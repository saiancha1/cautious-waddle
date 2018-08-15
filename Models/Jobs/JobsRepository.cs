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
    }
}