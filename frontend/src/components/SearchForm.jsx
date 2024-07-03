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
        className="d-flex flex-column mt-4"
        onSubmit={submitListingQuery}
      >
        <input
          type="text"
          id="listingQuery"
          name="query"
          placeholder="Search for ..."
          value={query}
          onChange={handleInputChange}
          className="form-control"
          required
        />
        <div className="form-group align-self-center mt-4">
          <input type="submit" className="btn btn-dark" value="Search" />
        </div>
      </form>
    </>
  );
};

export default SearchForm;
