using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface IJobsRepository
    {
        IEnumerable<JobsViewModel> GetJobsList(int minSalary, int maxSalary, string search);
        IEnumerable<JobsViewModel> AdminGetJobs(bool? expired, bool? approved);
        IEnumerable<JobsViewModel> GetMyJobs(string userId, bool? expired, bool? approved);
        Job GetJobById(int id);
        void AddJob(Job job);
        void DeleteJob(Job job);
        void EditJob(JobsViewModel job);
        void ExpiredJob(Job job);
        void ExpiredJobs();
        void approveJob(int id);
        void disapproveJob(int id);
    }
}