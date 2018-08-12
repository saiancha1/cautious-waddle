using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;

namespace cautious_waddle.Models
{
    public class CompaniesRepository : ICompaniesRepository
    {
        private CompaniesDbContext _context;
        public IEnumerable<Company> _companies => _context.Companies;

        public CompaniesRepository(CompaniesDbContext context) {
            _context = context;
        }

        public List<Company> GetAllCompaniesList()
        {
            return _context.Companies.Include(a => a.Users).ToList();
        }
        public IEnumerable<Company> GetCompaniesList(string businessType, string specialistArea, int minSize, int maxSize, string search)
        {
            IEnumerable<Company> companies = _companies;

            // Search
            if(search != null) {
                companies = companies.Where(c => c.Name.ToLower().Contains(search.ToLower()) || c.Description.ToLower().Contains(search.ToLower())
                || c.BusinessType.ToLower().Contains(search.ToLower()) || c.SpecialistArea.ToLower().Contains(search.ToLower()));
            }

            // Filters
            if(businessType != null) {
                companies = companies.Where(c => c.BusinessType == businessType);
            }
            if(specialistArea != null) {
                companies = companies.Where(c => c.SpecialistArea == specialistArea);
            }
            companies = companies.Where(c => c.Size >= minSize);
            if(maxSize != 0 && maxSize >= minSize) {
                companies = companies.Where(c => c.Size <= maxSize);
            }

            return companies;
        }
        public void AddCompany(Company company)
        {
            _context.Companies.Add(company);
            _context.SaveChanges();
        }
        public void DeleteCompany(Company company)
        {
            _context.Companies.Remove(company);
            _context.SaveChanges();
        }
        public void UpdateCompany(Company company)
        {
            _context.Companies.Update(company);
            _context.SaveChanges();
        }
        public Company GetCompanyById(int id)
        {
           return _context.Companies.Include(a => a.Users).SingleOrDefault(x => x.CompanyId == id);;
        }
       
    }
}