using Microsoft.AspNetCore.Mvc;
using cautious_waddle.Models;
using System.Linq;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class JobsController : Controller
    {
        private readonly IJobsRepository _jobsRespository;

        public JobsController(IJobsRepository JobsRepository) 
        {
            _jobsRespository = JobsRepository;
        }

        [HttpGet("getJobs")]
        public IActionResult getJobs()
        {
            try {
                return Ok(_jobsRespository.GetJobsList());
            } 
            catch
            {
                return NotFound();
            }
        }
    }
}