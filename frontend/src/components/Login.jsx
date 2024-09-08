import { useState, useEffect } from "react";

const Login = ({ loginUser }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  useEffect(() => {
    if (loggedIn) window.location.href = "/";
  }, [loggedIn]);

  //still need to have alert pop up if login fails
  const sendLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(credentials);
      if (res.status === 200) setLoggedIn(true);
      else {
        setShowDangerAlert(true);
        setCredentials({
          email: "",
          password: "",
        });
      }
    } catch (e) {
      alert(e.message);
      setCredentials({
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      {!loggedIn && (
        <>
          <h1 className="display-2 text-center">Login</h1>
          {showDangerAlert && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              Login failed. Please check your credentials and try again.
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowDangerAlert(false)}
              ></button>
            </div>
          )}
          <form className="container" onSubmit={sendLogin}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                id="loginEmail"
                className="form-control"
                placeholder="you@domain.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword">Password: </label>
              <input
                type="password"
                name="password"
                id="loginPassword"
                className="form-control"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <input type="submit" className="btn btn-primary" value="Login" />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
