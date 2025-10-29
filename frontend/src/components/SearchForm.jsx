import { useState } from "react";

const SearchForm = ({ getListings }) => {
  const [query, setQuery] = useState("");

  const submitListingQuery = (e) => {
    e.preventDefault();
    getListings(query);
  };
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <>
      <form
        aria-label="form"
        className="d-flex flex-column mt-4 p-4"
        onSubmit={submitListingQuery}
      >
        <div className="mb-3">
          <label htmlFor="listingQuery" className="form-label fw-semibold mb-2">
            What are you looking for?
          </label>
          <input
            type="text"
            id="listingQuery"
            name="query"
            placeholder="Enter item name..."
            value={query}
            onChange={handleInputChange}
            className="form-control form-control-lg"
            required
          />
        </div>
        <div className="form-group align-self-center">
          <input
            type="submit"
            className="btn btn-dark btn-lg px-5 py-3 shadow"
            value="🔍 Search Items"
          />
        </div>
      </form>
    </>
  );
};

export default SearchForm;
