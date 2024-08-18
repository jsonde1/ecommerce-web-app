import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Listing from "../components/Listing";

const AdminPage = ({ functions }) => {
  const [provisionalListings, setProvisionalListings] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const fetchListings = async () => {
      await functions.getListings().then((response) => {
        setProvisionalListings(response.data);
        setHasLoaded(true);
      });
    };
    fetchListings();
  }, []);
  return (
    <>
      {functions.admin && (
        <>
          <h2>Provisional Listings</h2>
          {hasLoaded &&
            provisionalListings.map((listing) => {
              return (
                <div key={listing.id}>
                  <Listing
                    Title={listing.Title}
                    Condition={listing.Condition}
                    Description={listing.Description}
                    Price={listing.Price}
                    MainImage={listing.MainImage}
                    Name={listing.Name}
                    PhoneNumber={listing.PhoneNumber}
                  />
                  <button className="btn btn-primary">Approve</button>
                  <button className="btn btn-danger">Reject</button>
                </div>
              );
            })}
        </>
      )}
      {!functions.admin && (
        <>
          {alert("You are not authorized to view this page.")}
          <Navigate to="/" />
        </>
      )}
    </>
  );
};

export default AdminPage;
