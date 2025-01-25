import Listing from "./Listing";
import Checkbox from "./CheckBox";
import { useState, useEffect } from "react";

const Listings = ({ data }) => {
  const [priceCheck, setPriceCheck] = useState(false);
  const [statusCheck, setStatusCheck] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    let sortedListings = [...data]; // Copy the data array to avoid mutating the original data

    if (priceCheck) {
      sortedListings.sort(
        (listingA, listingB) => listingA.Price - listingB.Price
      );
    } else if (statusCheck) {
      sortedListings.sort((listingA, listingB) =>
        listingA.Status.localeCompare(listingB.Status)
      );
    } else {
      sortedListings.sort(
        (listingA, listingB) =>
          new Date(listingA.CreationDate) - new Date(listingB.CreationDate)
      );
    }

    setSortedData(sortedListings);
  }, [data, priceCheck, statusCheck]);

  const handlePriceCheck = () => {
    setStatusCheck(false); // Uncheck the status checkbox when price is checked
    setPriceCheck(!priceCheck);
  };

  const handleStatusCheck = () => {
    setPriceCheck(false); // Uncheck the price checkbox when status is checked
    setStatusCheck(!statusCheck);
  };

  const listings = sortedData.map((listing) => (
    <Listing
      key={listing.id}
      ID={listing.id}
      Title={listing.Title}
      Condition={listing.Condition}
      Description={listing.Description}
      Price={listing.Price}
      Images={listing.Images}
      Name={listing.Name}
      PhoneNumber={listing.PhoneNumber}
      Status={listing.Status}
    />
  ));

  return (
    <div className="container">
      <h2 className="display-2 text-center">Listings</h2>
      <div className="text-center">
        <p>
          Sort by: &nbsp;
          <Checkbox
            label="Price"
            value={priceCheck}
            onChange={handlePriceCheck}
          />
          &nbsp;
          <Checkbox
            label="Status"
            value={statusCheck}
            onChange={handleStatusCheck}
          />
        </p>
      </div>
      {listings}
    </div>
  );
};

export default Listings;
