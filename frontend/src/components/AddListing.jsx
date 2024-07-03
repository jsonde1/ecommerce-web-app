import React from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const AddListing = ({ appendListing }) => {
  const id = useParams();
  const options = ["New", "Used"];
  const [listing, setListing] = useState({
    title: "",
    condition: options[0],
    description: "",
    price: 0,
    image: null,
  });
  const [submitted, setSubmitted] = useState(false);

  //still need to have alert pop up if login fails
  const sendListing = async (e) => {
    e.preventDefault();
    try {
      if (!listing.title) {
        return alert("cant be empty");
      }
      const res = await appendListing(id.id, listing);
      if (res.status === 201) setSubmitted(true);
      console.log(listing);
      setListing({
        title: "",
        condition: options[0],
        description: "",
        price: 0,
        image: null,
      });
    } catch (e) {
      console.log(e);
      setListing({
        title: "",
        condition: "",
        description: options[0],
        price: "",
        image: null,
      });
    }
  };
  return (
    <>
      {submitted && (
        <>
          {" "}
          {alert("Listing has been added")}
          {setSubmitted(false)}
        </>
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
              onChange={(e) =>
                setListing({
                  ...listing,
                  image: e.target.files[0],
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
