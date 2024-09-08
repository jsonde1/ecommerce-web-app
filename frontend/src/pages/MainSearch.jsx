import SearchForm from "../components/SearchForm";
import { useState } from "react";
import Listings from "../components/Listings";

const MainSearch = ({ getListings }) => {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  const [showInfoAlert, setShowInfoAlert] = useState(true); // Add a state to handle alert visibility

  const getListingHandler = async (query) => {
    const listings = await getListings(query);
    setData(listings.data);
    console.log("sadf" + JSON.stringify(listings));
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

          <h2 className="display-2 text-center mb-5">Welcome to DFBay</h2>
          <div
            className="card mx-auto p-2 bg-secondary text-light"
            style={{ maxWidth: "40rem" }}
          >
            <h3 className="display-4">Search...</h3>
            <SearchForm getListings={getListingHandler} />
          </div>
        </>
      )}
    </>
  );
};

export default MainSearch;
