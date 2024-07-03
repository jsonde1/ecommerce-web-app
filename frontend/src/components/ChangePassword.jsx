import React from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { changePassword } from "../services/user.service";

const ChangePassword = (passwordChange) => {
  const id = useParams();
  console.log(passwordChange);
  const [credentials, setCredentials] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [changed, setChanged] = useState(false);

  //still need to have alert pop up if login fails
  const sendPassword = async (e) => {
    e.preventDefault();
    try {
      if (!credentials.newPassword) {
        return alert("cant be empty");
      }
      const res = await changePassword(id.id, credentials);
      if (res.status === 200) setChanged(true);
      setCredentials({
        currentPassword: "",
        newPassword: "",
      });
    } catch (e) {
      console.log(e);
      setCredentials({
        currentPassword: "",
        newPassword: "",
      });
    }
  };
  return (
    <>
      {changed && (
        <>
          {" "}
          {alert("Password Changed")}
          {setChanged(false)}
        </>
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
              placeholder="current Password"
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
              placeholder="new Password"
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
