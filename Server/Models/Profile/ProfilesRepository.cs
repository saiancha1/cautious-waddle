using System.Collections.Generic;
using System.Linq;

namespace cautious_waddle.Models
{
    public class ProfilesRepository : IProfilesRepository
    {
        private ProfilesDbContext _context;

        public ProfilesRepository(ProfilesDbContext context) {
            _context = context;
        }

        public void AddProfile(Profile profile)
        {
            _context.Profiles.Add(profile);
            _context.SaveChanges();
        }

        public void DeleteProfile(Profile profile)
        {
            _context.Profiles.Remove(profile);
            _context.SaveChanges();
        }

        public void EditProfile(Profile profile)
        {
            _context.Profiles.Update(profile);
            _context.SaveChanges();
        }

        public Profile GetProfileById(int id)
        {
            return _context.Profiles.SingleOrDefault(p => p.ProfileId == id);
        }

        public bool UserHasProfile(string id)
        {
            IEnumerable<Profile> profiles = _context.Profiles.Where(p => p.UserId == id);
            if(profiles.Count() == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public Profile GetProfileByUserId(string userId)
        {
            return _context.Profiles.SingleOrDefault(p => p.UserId == userId);
        }

        public IEnumerable<Profile> GetProfiles()
        {
            IEnumerable<Profile> profiles = _context.Profiles;
            return profiles;
        }

        public bool IsProfileConsultant(string userId)
        {
            Profile profile = GetProfileByUserId(userId);
            if(profile.Consultant == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public void ToggleConsultant(string userId)
        {
            Profile profile = GetProfileByUserId(userId);

            profile.Consultant = profile.Consultant == 0 ? 1 : 0;

            _context.Profiles.Update(profile);
            _context.SaveChanges();
        }
    }
}