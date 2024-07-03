import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import * as User from "./services/user.service";
import * as Listing from "./services/listing.service";
import LoginRegister from "./pages/LoginRegister";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainSearch from "./pages/MainSearch";
import AllListings from "./pages/AllListings";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import "./style.css";

function App() {
  const [admin, setAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = User.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setAdmin(user.UserType === "admin");
      console.log(user.UserType);
    }
  }, []);
  const logOut = () => {
    console.log("logging out first");
    User.logout();
    setCurrentUser(null);
    setAdmin(false);
  };
  const dashboardFunctions = {
    changePassword: User.changePassword,
    getListings: Listing.getSellerListings,
    addListing: Listing.addListing,
    editListing: Listing.editListing,
    deleteListing: Listing.deleteListing,
  };

  return (
    <>
      <Header user={currentUser} logOut={logOut} />
      <div className="background-img">
        <Routes>
          <Route
            path="/loginregister"
            element={
              <LoginRegister
                loginUser={User.loginUser}
                registerUser={User.registerUser}
              />
            }
          />
          <Route
            path="/"
            element={<MainSearch getListings={Listing.getListingsbyQuery} />}
          />
          <Route
            path="/listings"
            element={<AllListings getAllListings={Listing.getAllListings} />}
          />
          <Route
            path="/user/:id"
            element={<Dashboard functions={dashboardFunctions} />}
          />
          <Route path="/admin" element={<AdminPage admin={admin} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
