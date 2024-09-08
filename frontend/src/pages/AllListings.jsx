import React, { useEffect, useState } from "react";
import Listings from "../components/Listings";

const AllListings = ({ getAllListings }) => {
  const [listings, setListings] = useState([]);
  const [showInfoAlert, setShowInfoAlert] = useState(true);
  useEffect(() => {
    const fetchListings = async () => {
      const listings = await getAllListings();
      console.log(listings.data);
      setListings(listings.data);
    };
    fetchListings();
  }, []);
  return (
    <div>
      {showInfoAlert && (
        <div
          className="alert alert-info alert-dismissible fade show"
          role="alert"
        >
          Please note that first time loading may take up to 60 seconds as the
          server is waking up.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowInfoAlert(false)}
          ></button>
        </div>
      )}
      <Listings data={listings} />
    </div>
  );
};

export default AllListings;
