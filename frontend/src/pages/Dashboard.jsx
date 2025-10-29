import ChangePassword from "../components/ChangePassword";
import AddListing from "../components/AddListing";
import ModifyListing from "../components/ModifyListing";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = ({ functions }) => {
  const [listings, setListings] = useState([]);
  const [hasLoaded, setHasLoaded] = useState();
  const id = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      await functions.getListings(id.id).then((response) => {
        setListings(response.data);
        setHasLoaded(true);
      });
    };
    fetchListings();
  }, [functions, id.id]);
  return (
    <div className="container">
      <h1 className="display-1 text-center mb-5 text-white">Dashboard</h1>

      <div className="mx-auto mb-5" style={{ maxWidth: "60rem" }}>
        <div className="card shadow-lg mb-4">
          <div className="card-body p-4">
            <h3 className="h3 fw-bold mb-4 text-primary">Change Password</h3>
            <ChangePassword passwordChange={functions.changePassword} />
          </div>
        </div>
      </div>

      <div className="mx-auto mb-5" style={{ maxWidth: "60rem" }}>
        <div className="card shadow-lg mb-4">
          <div className="card-body p-4">
            <h3 className="h3 fw-bold mb-4 text-primary">Add New Listing</h3>
            <AddListing appendListing={functions.addListing} />
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-column mx-auto gap-4 mb-5"
        style={{ maxWidth: "60rem" }}
      >
        <h3 className="h3 fw-bold text-center text-white mb-4">My Listings</h3>
        {hasLoaded &&
          listings &&
          listings.map((listing) => {
            listing.modifyListing = functions.editListing;
            listing.deleteListing = functions.deleteListing;
            return <ModifyListing key={listing.id} listing={listing} />;
          })}
      </div>
    </div>
  );
};

export default Dashboard;
