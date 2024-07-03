import Login from "../components/Login";
import Register from "../components/Register";

const LoginRegister = ({ loginUser, registerUser }) => {
  return (
    <div className="d-flex justify-content-center">
      <div>
        <Login loginUser={loginUser} />
      </div>
      <div>
        <Register registerUser={registerUser} />
      </div>
    </div>
  );
};

export default LoginRegister;
