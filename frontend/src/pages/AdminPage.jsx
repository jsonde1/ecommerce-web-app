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
  const addListing = async (id) => {
    await functions.approveListing(id);
    alert("Listing has been approved.");
    const newListings = provisionalListings.filter(
      (listing) => listing.id !== id
    );
    setProvisionalListings(newListings);
  };
  const deleteListing = async (id) => {
    await functions.deleteListing(id);
    alert("Listing has been deleted.");
    const newListings = provisionalListings.filter(
      (listing) => listing.id !== id
    );
    setProvisionalListings(newListings);
  };
  return (
    <>
      {functions.admin && (
        <>
          <div className="container ">
            <h2>Provisional Listings</h2>
            {hasLoaded &&
              provisionalListings.map((listing) => {
                return (
                  <div className="provisional" key={listing.id}>
                    <div className="p-2 flex-fill">
                      <Listing
                        Title={listing.Title}
                        Condition={listing.Condition}
                        Description={listing.Description}
                        Price={listing.Price}
                        MainImage={listing.MainImage}
                        Name={listing.Name}
                        PhoneNumber={listing.PhoneNumber}
                      />
                    </div>
                    <div className="d-flex gap-3 justify-content-around">
                      <button
                        onClick={() => addListing(listing.id)}
                        className="btn btn-primary"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => deleteListing(listing.id)}
                        className="btn btn-danger"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
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
