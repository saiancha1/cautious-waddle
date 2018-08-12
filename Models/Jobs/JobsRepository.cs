using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public class JobsRepository : IJobsRepository
    {
        private JobsDbContext _context;
        public IEnumerable<Job> _jobs => _context.Jobs;

        public JobsRepository()
        {

        }

        public IEnumerable<Job> GetJobsList()
        {
            throw new System.NotImplementedException();
        }
    }
}