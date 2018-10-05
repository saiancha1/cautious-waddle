using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface ILocalEventsRepository
    {
        IEnumerable<LocalEventsViewModel> GetEvents();
        IEnumerable<LocalEventsViewModel> GetExpiredEvents();
        LocalEvent GetEventById(int id);
        void addEvent(LocalEvent e);
        void editEvent (LocalEventsViewModel e);
        void removeEvent(LocalEvent e);
        void expireEvent(LocalEvent e);
        void expireEvents();
    }
}