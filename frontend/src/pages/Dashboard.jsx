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
    <>
      <h1 className="display-1 text-center mb-5">
        <u>Dashboard</u>
      </h1>
      <div className="mx-auto" style={{ maxWidth: "50rem" }}>
        <h3 className="display-3 text-center">Change Password</h3>
        <ChangePassword passwordChange={functions.changePassword} />
      </div>
      <div className="mx-auto" style={{ maxWidth: "50rem" }}>
        <h3 className="display-3 text-center">Add Listing</h3>
        <AddListing appendListing={functions.addListing} />
      </div>
      <div
        className=" d-flex flex-column mx-auto gap-3 p-4"
        style={{ maxWidth: "50rem" }}
      >
        <h3 className="display-3 text-center">My Listings</h3>
        {hasLoaded &&
          listings.map((listing) => {
            listing.modifyListing = functions.editListing;
            listing.deleteListing = functions.deleteListing;
            return <ModifyListing key={listing.id} listing={listing} />;
          })}
      </div>
    </>
  );
};

export default Dashboard;
