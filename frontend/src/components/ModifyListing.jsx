import { useState } from "react";
import { useParams } from "react-router-dom";

const ModifyListing = (props) => {
  const id = useParams();
  const options = ["New", "Used"];
  const [modifiedListing, setModifiedListing] = useState(props.listing);
  const [imageModified, setImageModified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailedAlert, setShowFailedAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const sendListing = async (e) => {
    e.preventDefault();
    try {
      // remove image property if new image is not uploaded
      if (!imageModified) delete modifiedListing.MainImage;
      const res = await modifiedListing.modifyListing(id.id, modifiedListing);
      if (res.status === 200) {
        setAlertMessage("Listing has been modified");
        setShowSuccessAlert(true);
      }
    } catch (e) {
      setAlertMessage(e.message);
      setShowFailedAlert(true);
    }
    alertTimeout();
  };

  const alertTimeout = () =>
    setTimeout(() => {
      setShowSuccessAlert(false);
      setShowFailedAlert(false);
      setAlertMessage("");
    });

  const deleteListing = async (e) => {
    e.preventDefault();
    try {
      const res = await modifiedListing.deleteListing(modifiedListing.id);
      if (res.status === 200) {
        setAlertMessage("Listing has been deleted");
        setShowSuccessAlert(true);
      }
    } catch (e) {
      setAlertMessage(e.message);
      setShowFailedAlert(true);
    }
    alertTimeout();
  };
  return (
    <>
      {showFailedAlert && (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {alertMessage}
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
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowSuccessAlert(false)}
          ></button>
        </div>
      )}
      {!submitted && (
        <form
          className="container bg-secondary rounded p-3"
          onSubmit={sendListing}
        >
          <div className="mb-3">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Name of your item"
              value={modifiedListing.Title}
              onChange={(e) =>
                setModifiedListing({
                  ...modifiedListing,
                  Title: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="conditon">Condition: </label>
            <select
              name="condition"
              onChange={(e) =>
                setModifiedListing({
                  ...modifiedListing,
                  Condition: e.target.value,
                })
              }
              value={modifiedListing.Condition}
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
              className="form-control"
              placeholder="Brief description of your item"
              value={modifiedListing.Description}
              onChange={(e) =>
                setModifiedListing({
                  ...modifiedListing,
                  Description: e.target.value,
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
              className="form-control"
              placeholder="How much would you like to sell it for?"
              value={modifiedListing.Price}
              onChange={(e) =>
                setModifiedListing({
                  ...modifiedListing,
                  Price: e.target.value,
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
              className="form-control"
              onChange={(e) => {
                setModifiedListing({
                  ...modifiedListing,
                  MainImage: e.target.files[0],
                });
                setImageModified(true);
              }}
            />
            <img
              src={modifiedListing.MainImage}
              style={{ width: "200px" }}
              alt="preview"
            />
          </div>
          <div className="mb-3">
            <input type="submit" className="btn btn-primary" value="Modify" />
            <button
              type="button"
              onClick={deleteListing}
              className="btn btn-danger"
              name="btn"
              value="Delete"
            >
              Delete
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ModifyListing;
