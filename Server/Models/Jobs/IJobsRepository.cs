using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IJobsRepository
    {
        IEnumerable<Job> GetJobsList(int minSalary, int maxSalary, string search);
        Job GetJobById(int id);
        void AddJob(Job job);
        void DeleteJob(Job job);
        void EditJob(Job job);
    }
}