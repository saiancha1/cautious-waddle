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

        public IEnumerable<Profile> GetProfiles()
        {
            IEnumerable<Profile> profiles = _context.Profiles;
            return profiles;
        }

        
    }
}