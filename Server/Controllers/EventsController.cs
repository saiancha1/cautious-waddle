using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using cautious_waddle.Models;
using cautious_waddle.ViewModels;
using cautious_waddle.Helpers;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class EventsController : Controller
    {
        private ILocalEventsRepository _localEventsRepository;

        public EventsController(ILocalEventsRepository EventsRepository)
        {
            _localEventsRepository = EventsRepository;
        }

        [HttpGet("getEvents")]
        public IActionResult GetEvents()
        {
            try
            {
                return Ok(_localEventsRepository.GetEvents());
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("addEvent")]
        [Authorize]
        public IActionResult AddEvent([FromBody] LocalEventsViewModel eventViewModel)
        {
            try
            {
                LocalEvent newEvent = Mapper.Map<LocalEventsViewModel, LocalEvent>(eventViewModel);

                newEvent.EventId = null;
                newEvent.UserId = IdentityHelper.GetUserId(HttpContext);
                newEvent.IsApproved = 0;
                newEvent.CreationDate = DateTime.Now;
                newEvent.LastUpdate = DateTime.Now;
                
                _localEventsRepository.addEvent(newEvent);

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("editEvent")]
        [Authorize]
        public IActionResult EditEvent([FromBody] LocalEventsViewModel localEventViewModel)
        {
            try
            {
                if(localEventViewModel.EventId.HasValue)
                {
                    LocalEvent localEvent = _localEventsRepository.GetEventById(localEventViewModel.EventId.Value);
                    if(localEvent.UserId == IdentityHelper.GetUserId(HttpContext))
                    {
                        _localEventsRepository.editEvent(localEventViewModel);
                        return Ok();
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("removeEvent")]
        [Authorize]
        public IActionResult removeEvent([FromBody] int eventId)
        {
            try
            {
                LocalEvent localEvent = _localEventsRepository.GetEventById(eventId);
                
                if(localEvent.UserId == IdentityHelper.GetUserId(HttpContext))
                {
                    _localEventsRepository.removeEvent(localEvent);
                    return Ok();
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}