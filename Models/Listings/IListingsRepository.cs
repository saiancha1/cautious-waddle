using System.Collections.Generic;

namespace cautious_waddle.Models
{
    public interface IListingsRepository
    {
        IEnumerable<Listing> GetListings();
        Listing GetListingById(int id);
        void AddListing(Listing listing);
        void DeleteListing(Listing listing);
        void EditListing(Listing listing);
    }
}