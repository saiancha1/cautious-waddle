using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IJobsRepository
    {
        IEnumerable<Job> GetJobsList(int minSalary, int maxSalary, string search);
    }
}