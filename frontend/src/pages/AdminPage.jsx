import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Listing from "../components/Listing";

const AdminPage = ({ functions }) => {
  const [provisionalListings, setProvisionalListings] = useState([]);
  const [showApproveAlert, setShowApproveAlert] = useState(false);
  const [showRejectAlert, setShowRejectAlert] = useState(false);
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
    setShowRejectAlert(false);
    setShowApproveAlert(true);
    setTimeout(() => setShowApproveAlert(false), 5000);
    const newListings = provisionalListings.filter(
      (listing) => listing.id !== id
    );
    setProvisionalListings(newListings);
  };
  const deleteListing = async (id) => {
    await functions.deleteListing(id);
    setShowApproveAlert(false);
    setShowRejectAlert(true);
    setTimeout(() => setShowRejectAlert(false), 5000);
    const newListings = provisionalListings.filter(
      (listing) => listing.id !== id
    );
    setProvisionalListings(newListings);
  };
  return (
    <>
      {functions.admin && (
        <>
          {showApproveAlert && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Listing has been approved.
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowApproveAlert(false)}
              ></button>
            </div>
          )}
          {showRejectAlert && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Listing has been deleted.
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowRejectAlert(false)}
              ></button>
            </div>
          )}
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
