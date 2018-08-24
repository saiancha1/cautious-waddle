using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IConsultantsRepository
    {
        string GetUserId(int id);
        Consultant GetConsultantById(int id);
        IEnumerable<Consultant> GetConsultants();
        void AddConsultant(Consultant consultant);
        void EditConsultant(Consultant consultant);
        void RemoveConsultant(Consultant consultant);
    }
}