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
    <div className="carousel-item h-100" key={index}>
      <img
        src={image.ImageURL}
        className="d-block w-100 h-100"
        alt="..."
        style={{ objectFit: "cover", height: "300px" }}
      />
    </div>
  ));
  carousel.shift();
  return (
    <div
      className="card mb-4 shadow-lg border-0 mx-auto"
      style={{ maxWidth: "70rem" }}
    >
      <div className="row g-0">
        {/* Image Carousel */}
        <div className="col-md-4">
          <div
            id={ID}
            className="carousel slide h-100"
            style={{ minHeight: "300px" }}
          >
            <div className="carousel-inner h-100">
              <div className="carousel-item active h-100">
                <img
                  src={Images[0].ImageURL}
                  className="d-block w-100 h-100"
                  alt={Title}
                  style={{ objectFit: "cover", height: "300px" }}
                />
              </div>
              {carousel}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${ID}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${ID}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="col-md-8">
          <div className="card-body p-4">
            <h4
              className="card-title fw-bold mb-3"
              style={{ fontSize: "1.75rem" }}
            >
              {Title}
            </h4>

            <div className="row mb-3">
              <div className="col-md-6">
                <p className="mb-2">
                  <span className="badge bg-primary me-2">Status</span>
                  <strong>{Status}</strong>
                </p>
                <p className="mb-2">
                  <span className="badge bg-info me-2">Condition</span>
                  <strong>{Condition}</strong>
                </p>
                <p className="mb-2 fs-4 fw-bold text-success">💷 £{Price}</p>
              </div>

              <div className="col-md-6">
                <p className="text-muted mb-2">
                  <strong>Description:</strong>
                </p>
                <p className="mb-2">{Description}</p>
              </div>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="mb-1">
                  <strong>Contact:</strong> {Name}
                </p>
                <p className="mb-0">
                  <strong>Phone:</strong>{" "}
                  <a
                    href={`tel:${PhoneNumber}`}
                    className="text-decoration-none"
                  >
                    {PhoneNumber}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
