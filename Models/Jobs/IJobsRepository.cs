using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IJobsRepository
    {
        IEnumerable<Job> GetJobsList();
    }
}