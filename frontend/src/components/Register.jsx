import { useState } from "react";
import { Navigate } from "react-router-dom";

const Register = ({ registerUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [registered, setRegistered] = useState(false);
  //still need to have alert pop up if login fails

  const sendRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(user);
      if (res.status === 201) setRegistered(true);
      else {
        alert("Registration failed");
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
      {registered && (
        <>
          {alert("Registration successful")}
          <Navigate to="/login" />
        </>
      )}
      {!registered && (
        <>
          <h1 className="text-center">Register</h1>
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
                onChange={(e) =>
                  setUser({ ...user, phoneNumber: e.target.value })
                }
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
              <div
                id="pwordHelp"
                className="form-text"
                style={{ color: "white" }}
              >
                Password must be at least 8 characters long, contain at least
                one lowercase letter, one uppercase letter, and one special
                character.
              </div>
            </div>
            <div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
