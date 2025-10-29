import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

const LoginRegister = ({ loginUser, registerUser }) => {
  const [showInfoAlert, setShowInfoAlert] = useState(true);
  return (
    <div className="container py-4">
      {showInfoAlert && (
        <div
          className="alert alert-info alert-dismissible fade show mx-auto mb-4"
          style={{ maxWidth: "800px" }}
          role="alert"
        >
          Please note that first time logging in/registering may take up to 60
          seconds as the server is waking up.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowInfoAlert(false)}
          ></button>
        </div>
      )}

      <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
        <div className="flex-fill" style={{ maxWidth: "500px" }}>
          <Login loginUser={loginUser} />
        </div>
        <div className="flex-fill" style={{ maxWidth: "500px" }}>
          <Register registerUser={registerUser} />
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
