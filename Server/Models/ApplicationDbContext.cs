using System;
using cautious_waddle.ViewModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace cautious_waddle.Models
{
    public class IdentityDbContext : IdentityDbContext<AppUser>
    {
        public IdentityDbContext(DbContextOptions<IdentityDbContext> opts) : base(opts)
        {

        }
    }

    public class CompaniesDbContext : DbContext
    {
        public DbSet<Company> Companies {get; set;}
        public DbSet<CompanyUser> CompanyUsers {get;set;}
        public CompaniesDbContext(DbContextOptions<CompaniesDbContext> opts) : base(opts)
        {
    
        }
         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var builder = modelBuilder.Entity<CompanyUser>();

            builder
            .Property(f => f.Identifier)
            .ValueGeneratedOnAdd();
            builder.Property(p => p.Identifier)
                .UseSqlServerIdentityColumn();
            builder.Property(p => p.Identifier)
                .Metadata.AfterSaveBehavior = PropertySaveBehavior.Ignore;
        }
    }

    public class ConsultantsDbContext : DbContext
    {
        public DbSet<Consultant> Consultants { get; set; }

        public ConsultantsDbContext(DbContextOptions<ConsultantsDbContext> opts) : base(opts)
        {
            
        }
    }

    public class JobsDbContext : DbContext
    {
        public DbSet<Job> Jobs { get; set; }
        public JobsDbContext(DbContextOptions<JobsDbContext> opts) : base(opts)
        {

        }
    }

    public class ProfilesDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }
        public ProfilesDbContext(DbContextOptions<ProfilesDbContext> opts) : base(opts)
        {
            
        }
    }

    public class EventsDbContext : DbContext
    {
        public DbSet<Event> Events { get; set; }
        public EventsDbContext(DbContextOptions<EventsDbContext> opts) : base(opts)
        {
            
        }
    }
}