using System.Collections.Generic;
using System.Linq;
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

        public List<Company> GetCompaniesList()
        {
            return _context.Companies.Include(a => a.Users).ToList();
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