import axios from "axios";
import Cookies from "js-cookie";
import authHeader from "./auth-header";

export const loginUser = async (credentials) => {
  try {
    console.log(credentials);
    const res = await axios.post(
      "https://ecommerce-web-app-dlhg.onrender.com/login",
      credentials
    );
    if (res.status === 200) {
      Cookies.set("user", JSON.stringify(res.data.user));
      delete res.data.token;
      return res;
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const registerUser = async (user) => {
  try {
    console.log(user);
    const res = await axios.post(
      "https://ecommerce-web-app-dlhg.onrender.com/register",
      user
    );
    if (res.status === 201) {
      return res;
    }
    throw new Error(`Login failed`);
  } catch (e) {
    console.log(e.message);
    return e;
  }
};
export const changePassword = async (id, passwords) => {
  try {
    const res = await axios.put(
      `https://ecommerce-web-app-dlhg.onrender.com/user/${id}`,
      passwords,
      {
        headers: authHeader(),
      }
    );
    console.log(res.data);
    if (res.status === 200) return res;
    console.log("login failed ");
    throw new Error(res.message);
  } catch (e) {
    return e;
  }
};

export const getCurrentUser = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  console.log("logging out");
  Cookies.remove("user");
};
