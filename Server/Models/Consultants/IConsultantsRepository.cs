using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface IConsultantsRepository
    {
        string GetUserId(int id);
        Consultant GetConsultantById(int id);
        IEnumerable<ConsultantsViewModel> GetConsultants();
        void AddConsultant(Consultant consultant, string userId);
        void EditConsultant(ConsultantsViewModel consultant);
        void RemoveConsultant(Consultant consultant, string userId);
    }
}