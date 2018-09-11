using System;
using Microsoft.AspNetCore.Mvc;

using cautious_waddle.Models;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class EventsController : Controller
    {
        private IEventsRepository _eventsRepository;

        public EventsController(IEventsRepository EventsRepository)
        {
            _eventsRepository = EventsRepository;
        }

        [HttpGet("getEvents")]
        public IActionResult GetEvents()
        {
            try
            {
                return Ok(_eventsRepository.GetEvents());
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}