using System.Collections.Generic;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public interface IConsultantsRepository
    {
        string GetUserId(int id);
        Consultant GetConsultantById(int id);
        IEnumerable<ConsultantsViewModel> GetConsultants();
        IEnumerable<ConsultantsViewModel> AdminGetConsultants(bool? approved);
        IEnumerable<ConsultantsViewModel> GetMyConsultants(string userId, bool? approved);
        void AddConsultant(Consultant consultant);
        void EditConsultant(ConsultantsViewModel consultant);
        void RemoveConsultant(Consultant consultant);
        void DeleteMyConsultants(string userId);
        void ApproveConsultant(int id);
        void DisapproveConsultant(int id);
    }
}