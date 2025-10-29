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
        <div className="container py-4">
          <h1 className="display-2 text-center mb-5 text-white">Admin Panel</h1>
          <h2 className="text-center mb-4 text-white h3">
            Review Provisional Listings
          </h2>

          {showApproveAlert && (
            <div
              className="alert alert-success alert-dismissible fade show mx-auto mb-4"
              style={{ maxWidth: "800px" }}
              role="alert"
            >
              ✓ Listing has been approved and is now live.
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
              className="alert alert-danger alert-dismissible fade show mx-auto mb-4"
              style={{ maxWidth: "800px" }}
              role="alert"
            >
              ✗ Listing has been rejected and deleted.
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowRejectAlert(false)}
              ></button>
            </div>
          )}

          <div
            className="d-flex flex-column gap-4"
            style={{ maxWidth: "70rem", margin: "0 auto" }}
          >
            {hasLoaded &&
              provisionalListings.map((listing) => {
                return (
                  <div key={listing.id} className="card shadow-lg">
                    <div className="card-body p-0">
                      <Listing
                        ID={listing.id}
                        Title={listing.Title}
                        Condition={listing.Condition}
                        Description={listing.Description}
                        Price={listing.Price}
                        Images={
                          listing.Images || [
                            { ImageURL: listing.MainImage || "" },
                          ]
                        }
                        Name={listing.Name}
                        PhoneNumber={listing.PhoneNumber}
                        Status={listing.Status}
                      />
                    </div>
                    <div className="card-footer d-flex gap-3 justify-content-center p-3 bg-light">
                      <button
                        onClick={() => addListing(listing.id)}
                        className="btn btn-success btn-lg px-5"
                      >
                        ✓ Approve Listing
                      </button>
                      <button
                        onClick={() => deleteListing(listing.id)}
                        className="btn btn-danger btn-lg px-5"
                      >
                        ✗ Reject Listing
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
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
