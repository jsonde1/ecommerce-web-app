import { useState } from "react";

const Register = ({ registerUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  //still need to have alert pop up if login fails

  const sendRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(user);
      if (res.status === 201) {
        setShowDangerAlert(false);
        setShowSuccessAlert(true);
        setUser({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
        });
      } else {
        setShowDangerAlert(true);
        setUser({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
        });
      }
    } catch (e) {
      alert(e.message);
      setUser({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
    }
  };

  return (
    <>
      <h1 className="display-2 text-center">Register</h1>
      {showSuccessAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Registration successful. Please login to continue.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowSuccessAlert(false)}
          ></button>
        </div>
      )}
      {showDangerAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Registration failed. This email may already be in use.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowDangerAlert(false)}
          ></button>
        </div>
      )}
      <form className="container" onSubmit={sendRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:{" "}
          </label>
          <input
            type="name"
            name="name"
            id="name"
            placeholder="John Doe"
            className="form-control"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="you@domain.com"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:{" "}
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="07573888492"
            className="form-control"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:{" "}
          </label>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="form-control"
            value={user.password}
            pattern="^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!£]).*$"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <div id="pwordHelp" className="form-text" style={{ color: "white" }}>
            Password must be at least 8 characters long, contain at least one
            lowercase letter, one uppercase letter, and one special character.
          </div>
        </div>
        <div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>
    </>
  );
};

export default Register;
