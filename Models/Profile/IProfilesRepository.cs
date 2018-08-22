using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IProfilesRepository
    {
        Profile GetProfileById(int id);
        bool UserHasProfile(string id);
        IEnumerable<Profile> GetProfiles();
        void AddProfile(Profile profile);
        void DeleteProfile(Profile profile);
        void EditProfile(Profile profile);
    }
}