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
          <b>Seller's Name:</b> {Name}
        </p>
        <p className="card-text">
          <b>Seller's Phone Number:</b> {PhoneNumber}
        </p>
        <p className="card-text">{Description}</p>
      </div>
      <img
        className=""
        src={MainImage}
        alt="Card image cap"
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default Listing;
