import { useState } from "react";
import { useParams } from "react-router-dom";

const AddListing = ({ appendListing }) => {
  const id = useParams();
  const options = ["New", "Used"];
  const [listing, setListing] = useState({
    title: "",
    condition: options[0],
    description: "",
    price: 0,
    images: [],
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailedAlert, setShowFailedAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previews, setPreviews] = useState([]);

  //still need to have alert pop up if login fails
  const sendListing = async (e) => {
    e.preventDefault();
    try {
      const res = await appendListing(id.id, listing);
      if (res.status === 201) setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 5000);
      setListing({
        title: "",
        condition: options[0],
        description: "",
        price: 0,
        images: [],
      });
    } catch (e) {
      console.log(e);
      setShowFailedAlert(true);
      setTimeout(() => setShowFailedAlert(false), 5000);
      setListing({
        title: "",
        condition: options[0],
        description: "",
        price: 0,
        images: [],
      });
    }
  };
  return (
    <>
      {showFailedAlert && (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            Failed to upload listing
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowFailedAlert(false)}
            ></button>
          </div>
        </>
      )}
      {showSuccessAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Listing has been uploaded and will be made live subject to admin
          approval
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowSuccessAlert(false)}
          ></button>
        </div>
      )}
      {!submitted && (
        <form className="container" onSubmit={sendListing}>
          <div className="mb-3">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              placeholder="Name of your item"
              value={listing.title}
              onChange={(e) =>
                setListing({
                  ...listing,
                  title: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="conditon">Condition: </label>
            <select
              name="condition"
              id="condition"
              onChange={(e) =>
                setListing({
                  ...listing,
                  condition: e.target.value,
                })
              }
              value={listing.condition}
            >
              {options.map((option, idx) => (
                <option key={idx}>{option}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              placeholder="Brief description of your item"
              value={listing.description}
              onChange={(e) =>
                setListing({
                  ...listing,
                  description: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            {/* find way to add £ sign */}
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              name="price"
              id="price"
              className="form-control"
              placeholder="How much would you like to sell it for?"
              value={listing.price}
              onChange={(e) =>
                setListing({
                  ...listing,
                  price: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image">Image: </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              id="image"
              className="form-control"
              multiple
              onChange={(e) =>
                setListing({
                  ...listing,
                  images: [...e.target.files],
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="submit"
              className="btn btn-primary"
              value="Add Listing"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default AddListing;
