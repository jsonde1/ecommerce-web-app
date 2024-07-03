import { Navigate } from "react-router-dom";

const AdminPage = ({ admin }) => {
  return (
    <>
      {admin && (
        <>
          <h2>AdminPage</h2>
          <p>Only admins can view this page.</p>
          <p>Provisional listings will eventually been shown here</p>
        </>
      )}
      {!admin && (
        <>
          {alert("You are not authorized to view this page.")}
          <Navigate to="/" />
        </>
      )}
    </>
  );
};

export default AdminPage;
