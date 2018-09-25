using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface IJobsRepository
    {
        IEnumerable<JobsViewModel> GetJobsList(int minSalary, int maxSalary, string search);
        Job GetJobById(int id);
        void AddJob(Job job);
        void DeleteJob(Job job);
        void EditJob(JobsViewModel job);
    }
}