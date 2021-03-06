using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.ServiceModel;

using cautious_waddle.Models;
using cautious_waddle.ViewModels;
using cautious_waddle.Helpers;
using System.Xml;
using System.ServiceModel.Syndication;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace cautious_waddle.Controllers
{
    [Route("/api/[controller]")]
    public class EventsController : Controller
    {
        private readonly ILocalEventsRepository _localEventsRepository;
        private readonly IEmailService _emailService;
        private IBlobStorage _blobStorage;

        public EventsController(ILocalEventsRepository EventsRepository, IEmailService emailService, IBlobStorage blobStorage)
        {
            _localEventsRepository = EventsRepository;
            _emailService = emailService;
            _blobStorage = blobStorage;
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

        [HttpGet("adminGetEvents")]
        [Authorize(Roles="Admin")]
        public IActionResult AdminGetEvents([FromQuery] bool? expired, [FromQuery] bool? approved)
        {
            try
            {
                return Ok(_localEventsRepository.AdminGetEvents(expired, approved));
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("getMyEvents")]
        [Authorize]
        public IActionResult GetMyEvents([FromQuery] bool? expired, [FromQuery] bool? approved)
        {
            try
            {
                return Ok(_localEventsRepository.GetMyEvents(IdentityHelper.GetUserId(HttpContext), expired, approved));
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
                newEvent.Expired = 0;
                newEvent.CreationDate = DateTime.Now;
                newEvent.LastUpdate = DateTime.Now;

                _localEventsRepository.addEvent(newEvent);

                string content = "A new event listing has been added\n" + 
                "\nID: " + newEvent.EventId + 
                "\nEvent name: " + newEvent.EventName + 
                "\n\nPlease go to https://capstone1.azurewebsites.net/admin to approve this event listing";
                string subject = "New event listing";

                _emailService.SendToAdmins(subject, content);

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

        [HttpPost("adminRemoveEvent")]
        [Authorize(Roles="Admin")]
        public IActionResult adminRemoveEvent([FromBody] int eventId)
        {
            try
            {
                LocalEvent localEvent = _localEventsRepository.GetEventById(eventId);
                _localEventsRepository.removeEvent(localEvent);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpGet("getEventsFromFeed")]
        [Authorize(Roles="Admin")]
        public IActionResult GetEventsFromFeed()
        {
            string url = "https://itp.nz/events/palmie_north/rss";
            XmlReader reader = XmlReader.Create(url);
            SyndicationFeed feed = SyndicationFeed.Load(reader);
            reader.Close();
            List<LocalEvent>lEvents = new List<LocalEvent>();
            foreach (SyndicationItem item in feed.Items)
            {
                LocalEvent Nevent = new LocalEvent();
                Nevent.EventName = item.Title.Text;
                Nevent.EventDescription = item.Summary.Text;
                Nevent.EventUrl = item.Links[0].Uri.AbsoluteUri;
                Nevent.CreationDate = DateTime.Now;
                Nevent.LastUpdate = DateTime.Now;
                Nevent.StartDate = DateTime.Now;
                Nevent.Duration = 1;
                Nevent.EventId = null;
                Nevent.UserId = IdentityHelper.GetUserId(HttpContext);
                Nevent.IsApproved = 0;
                Nevent.Expired = 0;
                Regex regex = new Regex(@"(?<=\()(.*?)(?=\))");
                Match matches = regex.Match(Nevent.EventName);
                GroupCollection groups = matches.Groups;

                _localEventsRepository.addEvent(Nevent);
                lEvents.Add(Nevent);
            }
            return Ok(lEvents);
        }

        [HttpPost("approveEvent")]
        [Authorize(Roles="Admin")]
        public IActionResult ApproveEvent([FromBody] int id)
        {
            try
            {
                _localEventsRepository.approveEvent(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("disapproveEvent")]
        [Authorize(Roles="Admin")]
        public IActionResult DisapproveEvent([FromBody] int id)
        {
            try
            {
                _localEventsRepository.disapproveEvent(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("addEventImage")]
        [Authorize]
        public async  Task<IActionResult> AddEventImage(IFormFile file)
        {
            if(file != null)
            {
                   var storageAccount =  _blobStorage.GetStorageAccount();
                   return Ok(await _blobStorage.UploadFileAsync(storageAccount, file, HttpContext));
            }
            return NotFound();
        }       
    }
}