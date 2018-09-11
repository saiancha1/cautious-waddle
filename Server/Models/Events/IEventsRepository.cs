using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface IEventsRepository
    {
        IEnumerable<EventsViewModel> GetEvents();
    }
}