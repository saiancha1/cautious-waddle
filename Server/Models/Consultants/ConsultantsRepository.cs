using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public class ConsultantsRepository : IConsultantsRepository
    {
        ConsultantsDbContext _context;
        IProfilesRepository _profilesRepository;

        public ConsultantsRepository(ConsultantsDbContext context, IProfilesRepository profilesRepository)
        {
            _context = context;
            _profilesRepository = profilesRepository;
        }

        public string GetUserId(int id)
        {
            return _context.Consultants.SingleOrDefault(c => c.ConsultantId == id).UserId;
        }

        public Consultant GetConsultantById(int id)
        {
            return _context.Consultants.SingleOrDefault(c => c.ConsultantId == id);
        }

        public IEnumerable<ConsultantsViewModel> GetConsultants()
        {
            IEnumerable<Consultant> consultants = _context.Consultants;

            // Filtering here

            IEnumerable<ConsultantsViewModel> consultantsViewModel = Mapper.Map<IEnumerable<Consultant>, IEnumerable<ConsultantsViewModel>>(consultants);

            return consultantsViewModel;
        }

        public IEnumerable<Consultant> AdminGetConsultants(bool? approved)
        {
            IEnumerable<Consultant> consultants = _context.Consultants;

            if(approved != null)
            {
                consultants = approved == true ? consultants.Where(c => c.IsApproved == 1) : consultants.Where(c => c.IsApproved == 0);
            }

            return consultants;
        }

        public void AddConsultant(Consultant consultant)
        {
            _context.Consultants.Add(consultant);
            _context.SaveChanges();
        }

        public void EditConsultant(ConsultantsViewModel consultant)
        {
            Consultant oldConsultant = GetConsultantById(consultant.ConsultantId.Value);
            _context.Consultants.Attach(oldConsultant);

            oldConsultant.LastUpdate     = DateTime.Now;
            oldConsultant.ReminderDate   = DateTime.Now.AddMonths(1);
            oldConsultant.FirstName      = consultant.FirstName;
            oldConsultant.LastName       = consultant.LastName;
            oldConsultant.ImageURL       = consultant.ImageURL;
            oldConsultant.SpecialistArea = consultant.SpecialistArea;
            oldConsultant.ConsultantDesc = consultant.ConsultantDesc;
            oldConsultant.Phone          = consultant.Phone;
            oldConsultant.Email          = consultant.Email;
            oldConsultant.Website        = consultant.Website;
            oldConsultant.Address1       = consultant.Address1;
            oldConsultant.Address2       = consultant.Address2;
            oldConsultant.Suburb         = consultant.Suburb;
            oldConsultant.PostalCode     = consultant.PostalCode;
            oldConsultant.City           = consultant.City;
            oldConsultant.Country        = consultant.Country;

            _context.SaveChanges();
        }

        public void RemoveConsultant(Consultant consultant)
        {
            _context.Consultants.Remove(consultant);
            _context.SaveChanges();
        }

        public void ApproveConsultant(int id)
        {
            Consultant consultant = GetConsultantById(id);
            _context.Consultants.Attach(consultant);
            consultant.IsApproved = 1;
            _context.SaveChanges();
        }

        public void DisapproveConsultant(int id)
        {
            Consultant consultant = GetConsultantById(id);
            _context.Consultants.Attach(consultant);
            consultant.IsApproved = 0;
            _context.SaveChanges();
        }
    }
}