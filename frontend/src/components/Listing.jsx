const Listing = ({
  ID,
  Title,
  Condition,
  Description,
  Price,
  Images,
  Name,
  PhoneNumber,
  Status,
}) => {
  ID = `listing-${ID}`;
  const carousel = Images.map((image, index) => (
    <div className="carousel-item" key={index}>
      <img
        src={image.ImageURL}
        className="d-block w-100"
        alt="..."
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  ));
  carousel.shift();
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
            <div id={ID} class="carousel slide">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    src={Images[0].ImageURL}
                    class="d-block w-100"
                    alt="..."
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
                {carousel}
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target={`#${ID}`}
                data-bs-slide="prev"
              >
                <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target={`#${ID}`}
                data-bs-slide="next"
              >
                <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            {/* <img
              className="listings-image"
              src={MainImage}
              alt="Card image cap"
              style={{ width: "200px", height: "200px" }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
