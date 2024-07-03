import Cookies from "js-cookie";
const authHeader = () => {
  const user = JSON.parse(Cookies.get("user"));

  if (user && user.token) {
    return {
      "auth-token": user.token,
    };
  } else {
    return {};
  }
};

export default authHeader;
