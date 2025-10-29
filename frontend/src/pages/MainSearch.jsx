import SearchForm from "../components/SearchForm";
import { useState } from "react";
import Listings from "../components/Listings";

const MainSearch = ({ getListings, user }) => {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [showInfoAlert, setShowInfoAlert] = useState(true); // Add a state to handle alert visibility

  const getListingHandler = async (query) => {
    const listings = await getListings(query);

    console.log(
      "Listing search results(Stringified): " + JSON.stringify(listings.data)
    );
    setData(listings.data);
    console.log("Listing search results(data): " + JSON.stringify(data));
    setSubmitted(true);
  };

  return (
    <>
      {submitted && <Listings data={data} />}
      {!submitted && (
        <>
          {/* Display the alert if `showAlert` is true */}
          {showInfoAlert && (
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              Please note that first time loading may take up to 60 seconds as
              the server is waking up.
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowInfoAlert(false)}
              ></button>
            </div>
          )}

          {!user && (
            <h2 className="display-2 text-center mb-5 text-white">
              Welcome to DFBay
            </h2>
          )}
          {user && (
            <h2 className="display-2 text-center mb-5 text-white">
              Welcome back, {user.Name}! 👋
            </h2>
          )}
          <div
            className="card mx-auto p-4 shadow-lg"
            style={{ maxWidth: "50rem" }}
          >
            <h3 className="display-4 text-center mb-4">Search for Items</h3>
            <SearchForm getListings={getListingHandler} />
          </div>
        </>
      )}
    </>
  );
};

export default MainSearch;
