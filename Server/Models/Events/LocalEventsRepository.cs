using System;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public class LocalEventsRepository : ILocalEventsRepository
    {
        private LocalEventsDbContext _context;

        public LocalEventsRepository(LocalEventsDbContext context)
        {
            _context = context;
        }

        public IEnumerable<LocalEventsViewModel> GetEvents()
        {
            IEnumerable<LocalEvent> events = _context.LocalEvents.Where(e => e.Expired == 0 && e.IsApproved == 1);

            IEnumerable<LocalEventsViewModel> eventsViewModel = Mapper.Map<IEnumerable<LocalEvent>, IEnumerable<LocalEventsViewModel>>(events);

            return eventsViewModel;
        }

        public IEnumerable<LocalEventsViewModel> AdminGetEvents(bool? expired, bool? approved)
        {
            IEnumerable<LocalEvent> events = _context.LocalEvents;

            // Filtering
            if(expired != null)
            {
                events = expired == true ? events.Where(e => e.Expired == 1) : events.Where(e => e.Expired == 0);
            }
            if(approved != null)
            {
                events = approved == true ? events.Where(e => e.IsApproved == 1) : events.Where(e => e.IsApproved == 0);
            }

            IEnumerable<LocalEventsViewModel> eventsViewModel = Mapper.Map<IEnumerable<LocalEvent>, IEnumerable<LocalEventsViewModel>>(events);

            return eventsViewModel;
        }

        public LocalEvent GetEventById(int id)
        {
            return _context.LocalEvents.SingleOrDefault(e => e.EventId == id);
        }

        public void addEvent(LocalEvent e)
        {
            _context.LocalEvents.Add(e);
            _context.SaveChanges();
        }

        public void editEvent(LocalEventsViewModel newEvent)
        {
            LocalEvent oldEvent = GetEventById(newEvent.EventId.Value);
            _context.LocalEvents.Attach(oldEvent);

            oldEvent.LastUpdate       = DateTime.Now;
            oldEvent.EventName        = newEvent.EventName;
            oldEvent.hostedBy         = newEvent.HostedBy;
            oldEvent.Contact          = newEvent.Contact;
            oldEvent.Website          = newEvent.Website;
            oldEvent.StartDate        = newEvent.StartDate;
            oldEvent.Recurring        = newEvent.Recurring;
            oldEvent.EventDescription = newEvent.EventDescription;
            oldEvent.EventType        = newEvent.EventType;
            oldEvent.EventLocation    = newEvent.EventLocation;
            oldEvent.ImageURL         = newEvent.ImageURL;

            _context.SaveChanges();
        }

        public void removeEvent(LocalEvent e)
        {
            _context.LocalEvents.Remove(e);
            _context.SaveChanges();
        }

        public void expireEvent(LocalEvent localEvent)
        {
            _context.LocalEvents.Attach(localEvent);

            if(localEvent.Recurring == null)
            {
                localEvent.Expired = 1;
            }
            else
            {
                localEvent.StartDate = localEvent.StartDate.AddDays(localEvent.Recurring.Value);
            }

            _context.SaveChanges();
        }

        public void expireEvents()
        {
            List<LocalEvent> events = _context.LocalEvents.ToList();
            DateTime current = DateTime.Now;

            foreach(LocalEvent localEvent in events)
            {
                DateTime end = localEvent.StartDate;

                if(end < current)
                {
                    expireEvent(localEvent);
                }
            }
        }

        public void approveEvent(int id)
        {
            LocalEvent localEvent = GetEventById(id);
            _context.LocalEvents.Attach(localEvent);
            localEvent.IsApproved = 1;
            _context.SaveChanges();
        }

        public void disapproveEvent(int id)
        {
            LocalEvent localEvent = GetEventById(id);
            _context.LocalEvents.Attach(localEvent);
            localEvent.IsApproved = 0;
            _context.SaveChanges();
        }
    }
}