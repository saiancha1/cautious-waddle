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
            IEnumerable<LocalEvent> events = _context.LocalEvents.Where(e => e.Expired == 0);

            IEnumerable<LocalEventsViewModel> eventsViewModel = Mapper.Map<IEnumerable<LocalEvent>, IEnumerable<LocalEventsViewModel>>(events);

            return eventsViewModel;
        }

        public IEnumerable<LocalEventsViewModel> GetExpiredEvents()
        {
            IEnumerable<LocalEvent> events = _context.LocalEvents.Where(e => e.Expired == 1);

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
            oldEvent.StartDate        = newEvent.StartDate;
            oldEvent.Duration         = newEvent.Duration;
            oldEvent.EventDescription = newEvent.EventDescription;
            oldEvent.EventLocation    = newEvent.EventLocation;
            oldEvent.ImageURL         = newEvent.ImageURL;

            _context.SaveChanges();
        }

        public void removeEvent(LocalEvent e)
        {
            _context.LocalEvents.Remove(e);
            _context.SaveChanges();
        }
    }
}