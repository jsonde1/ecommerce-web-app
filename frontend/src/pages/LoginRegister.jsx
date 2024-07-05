import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegister = ({ loginUser, registerUser }) => {
  return (
    <div className="d-flex container justify-content-center">
      <div className="flex-grow-1">
        <Login loginUser={loginUser} />
      </div>
      <div className="flex-grow-1" style={{ maxWidth: "45rem" }}>
        <Register registerUser={registerUser} />
      </div>
    </div>
  );
};

export default LoginRegister;
