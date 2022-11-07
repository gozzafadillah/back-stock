import "../assets/css/Login.css";
import { logInWithEmailAndPassword } from "../config/firebase";
import LoginForm from "../component/auth/LoginForm";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleClick = (email, password) => {
    logInWithEmailAndPassword(email, password);
    setTimeout(function () {
      navigate("/dashboard");
    }, 2000);
  };

  return <LoginForm handleClick={handleClick} />;
}
export default Login;
