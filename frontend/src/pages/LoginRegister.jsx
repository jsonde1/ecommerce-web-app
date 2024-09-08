import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

const LoginRegister = ({ loginUser, registerUser }) => {
  const [showInfoAlert, setShowInfoAlert] = useState(true);
  return (
    <>
      {showInfoAlert && (
        <div
          className="alert alert-info alert-dismissible fade show"
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
      <div className="d-flex container justify-content-center">
        <div className="flex-grow-1">
          <Login loginUser={loginUser} />
        </div>
        <div className="flex-grow-1" style={{ maxWidth: "45rem" }}>
          <Register registerUser={registerUser} />
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
