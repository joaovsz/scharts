import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthParams, handleLogin } from "../../redux/request-slice";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const ParamsSplitUp = useSelector((store: any) => store.requests.params);
  const { access_token } = ParamsSplitUp;

  return (
    <div>
      <button onClick={() => dispatch(handleLogin())}>Conectar</button>
    </div>
  );
};

export default Login;
