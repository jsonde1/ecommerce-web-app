const Listing = ({
  Title,
  Condition,
  Description,
  Price,
  MainImage,
  Name,
  PhoneNumber,
  Status,
}) => {
  return (
    <div
      className="card d-flex flex-row mx-auto bg-secondary mt-3 gap-3"
      style={{ maxWidth: "50rem" }}
    >
      <div className="card-body p-2 ">
        <h5 className=" display-6 text-center" style={{ fontSize: "2rem" }}>
          {Title}
        </h5>
        <div className="row">
          <div className="col-4">
            <p className="card-text">
              <b>Condition:</b> {Condition}
            </p>

            <p className="card-text">
              <b>Price:</b> £{Price}
            </p>
            <p className="card-text">
              <b>Status:</b> {Status}
            </p>
            <p className="card-text">
              <b>Name:</b> {Name}
            </p>
            <p className="card-text">
              <b>Phone Number:</b> {PhoneNumber}
            </p>
          </div>
          <div className="col-4">
            <p className="card-text">{Description}</p>
          </div>
          <div className="col-4">
            <img
              className="listings-image"
              src={MainImage}
              alt="Card image cap"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
