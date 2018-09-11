using System.Collections.Generic;
using AutoMapper;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public class EventsRepository : IEventsRepository
    {
        private EventsDbContext _context;

        public EventsRepository(EventsDbContext context)
        {
            _context = context;
        }

        public IEnumerable<EventsViewModel> GetEvents()
        {
            IEnumerable<Event> events = _context.Events;

            IEnumerable<EventsViewModel> eventsViewModel = Mapper.Map<IEnumerable<Event>, IEnumerable<EventsViewModel>>(events);

            return eventsViewModel;
        }
    }
}