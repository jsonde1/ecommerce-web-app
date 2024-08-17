import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.headers["auth-token"];
  if (!token) {
    return res.status(403).send({ message: `No token provided` });
  }

  jwt.verify(token, "process.env.JWT_SECRET.KEY", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: `Unauthorised` });
    }
    // if (decoded.userType !== "admin") req.userId = decoded.id;
    req.UserType = decoded.userType;
    next();
  });
};
const adminCheck = (req, res, next) => {
  if (req.UserType === "admin") {
    next();
    return;
  } else if (req.UserType === "standard") {
    res.status(403).send({ message: `Request requires Admin role` });
    return;
  }
  res.status(500).send({ message: "You are not logged in" });
  return;
};
const authJwt = {
  verifyToken,
  adminCheck,
};

export default authJwt;
