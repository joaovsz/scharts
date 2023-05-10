import React from "react";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../redux/request-slice";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <a href="http://localhost:8080/login">
        <button>Conectar</button>
      </a>
    </div>
  );
};

export default Login;
