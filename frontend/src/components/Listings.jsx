import Listing from "./Listing";
const Listings = ({ data }) => {
  console.log(data);
  const listings = data
    ? data.map((listing) => {
        return (
          <Listing
            key={listing.id}
            Title={listing.Title}
            Condition={listing.Condition}
            Description={listing.Description}
            Price={listing.Price}
            MainImage={listing.MainImage}
            Name={listing.Name}
            PhoneNumber={listing.PhoneNumber}
            Status={listing.Status}
          />
        );
      })
    : null;
  return (
    <div className="container">
      <h2 className="display-2 text-center">Listings</h2>
      {listings}
    </div>
  );
};

export default Listings;
