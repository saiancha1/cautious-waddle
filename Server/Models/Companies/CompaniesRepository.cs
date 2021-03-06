using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System;

using cautious_waddle.ViewModels;

namespace cautious_waddle.Models
{
    public class CompaniesRepository : ICompaniesRepository
    {
        private CompaniesDbContext _context;
        public IEnumerable<Company> _companies => _context.Companies;

        public CompaniesRepository(CompaniesDbContext context) {
            _context = context;
        }

        public IEnumerable<CompaniesViewModel> GetCompaniesList(int? summerJobs, string businessType, string specialistArea, int minSize, int maxSize, string search)
        {
            IEnumerable<Company> companies = _context.Companies.Where(c => c.IsApproved == 1);

            // Search
            if(search != null) {
                companies = companies.Where(c => c.CompanyName.ToLower().Contains(search.ToLower()) || c.CompanyDesc.ToLower().Contains(search.ToLower())
                || c.BusinessType.ToLower().Contains(search.ToLower()) || c.SpecialistArea.ToLower().Contains(search.ToLower()));
            }

            // Filters
            if(summerJobs != null) {
                companies = companies.Where(c => c.SummerJobs == summerJobs);
            }
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

            IEnumerable<CompaniesViewModel> companiesViewModel = Mapper.Map<IEnumerable<Company>, IEnumerable<CompaniesViewModel>>(companies);

            return companiesViewModel;
        }

        public IEnumerable<CompaniesViewModel> AdminGetCompanies(bool? approved)
        {
            IEnumerable<Company> companies = _context.Companies;

            if(approved != null)
            {
                companies = approved == true ? companies.Where(c => c.IsApproved == 1) : companies.Where(c => c.IsApproved == 0);
            }

            IEnumerable<CompaniesViewModel> companiesViewModel = Mapper.Map<IEnumerable<Company>, IEnumerable<CompaniesViewModel>>(companies);

            return companiesViewModel;
        }

        public IEnumerable<CompaniesViewModel> GetMyCompanies(string userId, bool? approved)
        {
            IEnumerable<Company> companies = _context.Companies.Where(c => c.UserId == userId);

            if(approved != null)
            {
                companies = approved == true ? companies.Where(c => c.IsApproved == 1) : companies.Where(c => c.IsApproved == 0);
            }

            IEnumerable<CompaniesViewModel> companiesViewModel = Mapper.Map<IEnumerable<Company>, IEnumerable<CompaniesViewModel>>(companies);

            return companiesViewModel;
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

        public void DeleteMyCompanies(string userId)
        {
            IEnumerable<CompaniesViewModel> myCompanies = GetMyCompanies(userId, null);
            foreach(CompaniesViewModel companyViewModel in myCompanies)
            {
                Company company = GetCompanyById_model(companyViewModel.CompanyId.Value);
                DeleteCompany(company);
            }
        }

        public void UpdateCompany(CompaniesViewModel company)
        {
            Company oldCompany = GetCompanyById_model(company.CompanyId.Value);
            _context.Companies.Attach(oldCompany);

            oldCompany.LastUpdate     = DateTime.Now;
            oldCompany.ReminderDate   = DateTime.Now.AddMonths(1);
            oldCompany.ContactEmail   = company.ContactEmail;
            oldCompany.CompanyName    = company.CompanyName;
            oldCompany.Logo           = company.Logo;
            oldCompany.Size           = company.Size;
            oldCompany.BusinessType   = company.BusinessType;
            oldCompany.SpecialistArea = company.SpecialistArea;
            oldCompany.CompanyDesc    = company.CompanyDesc;
            oldCompany.Phone          = company.Phone;
            oldCompany.Email          = company.Email;
            oldCompany.Address1       = company.Address1;
            oldCompany.Address2       = company.Address2;
            oldCompany.Suburb         = company.Suburb;
            oldCompany.PostalCode     = company.PostalCode;
            oldCompany.City           = company.City;
            oldCompany.Country        = company.Country;
            oldCompany.SummerJobs     = company.SummerJobs;
            oldCompany.Website        = company.Website;

            // I don't think these are necassary because you can't pass them with the view model
            // _context.Entry(oldCompany).Property(c => c.CompanyId).IsModified = false;
            // _context.Entry(oldCompany).Property(c => c.IsApproved).IsModified = false;
            // _context.Entry(oldCompany).Property(c => c.CreationDate).IsModified = false;
            // _context.Entry(oldCompany).Property(c => c.Users).IsModified = false;

            _context.SaveChanges();
        }
        public CompaniesViewModel GetCompanyById_viewModel(int id)
        {
            Company company = _context.Companies.SingleOrDefault(x => x.CompanyId == id);
            CompaniesViewModel viewModel = Mapper.Map<Company, CompaniesViewModel>(company);

            return viewModel;
        }

        public Company GetCompanyById_model(int id)
        {
           return _context.Companies.SingleOrDefault(x => x.CompanyId == id);
        }

        public void approveCompany(int id)
        {
            Company company = GetCompanyById_model(id);
            _context.Companies.Attach(company);
            company.IsApproved = 1;
            _context.SaveChanges();
        }

        public void disapproveCompany(int id)
        {
            Company company = GetCompanyById_model(id);
            _context.Companies.Attach(company);
            company.IsApproved = 0;
            _context.SaveChanges();
        }
    }
}