import React, { useEffect, useState } from "react";
import Listings from "../components/Listings";

const AllListings = ({ getAllListings }) => {
  const [listings, setListings] = useState([]);
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
      <Listings data={listings} />
    </div>
  );
};

export default AllListings;
