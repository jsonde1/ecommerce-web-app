import { useState } from "react";
import { useParams } from "react-router-dom";
import { changePassword } from "../services/user.service";

const ChangePassword = (passwordChange) => {
  const id = useParams();
  console.log(passwordChange);
  const [credentials, setCredentials] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [changed, setChanged] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailedAlert, setShowFailedAlert] = useState(false);

  //still need to have alert pop up if login fails
  const sendPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(id.id, credentials);
      if (res.status === 200) setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      setCredentials({
        currentPassword: "",
        newPassword: "",
      });
    } catch (e) {
      console.log(e);
      setShowFailedAlert(true);
      setTimeout(() => setShowFailedAlert(false), 5000);
      setCredentials({
        currentPassword: "",
        newPassword: "",
      });
    }
  };
  return (
    <>
      {showFailedAlert && (
        <>
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            Failed to update password
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowFailedAlert(false)}
            ></button>
          </div>
        </>
      )}
      {showSuccessAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Password has been successfully changed.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowSuccessAlert(false)}
          ></button>
        </div>
      )}
      {!changed && (
        <form className="container" onSubmit={sendPassword}>
          <div className="mb-3">
            <label htmlFor="currentpassword">Current Password: </label>
            <input
              type="password"
              name="password"
              id="currentpassword"
              className="form-control"
              placeholder="Current Password"
              value={credentials.currentPassword}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  currentPassword: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newpassword">New Password: </label>
            <input
              type="password"
              name="password"
              id="newpassword"
              className="form-control"
              placeholder="New Password"
              value={credentials.newPassword}
              onChange={(e) =>
                setCredentials({ ...credentials, newPassword: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-3">
            <input type="submit" className="btn btn-primary" value="update" />
          </div>
        </form>
      )}
    </>
  );
};

export default ChangePassword;
