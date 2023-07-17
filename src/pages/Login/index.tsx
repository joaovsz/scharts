import React from "react";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
const Login = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <h1 className={styles.instructions}>
        Entre com sua conta do Spotify para ter acesso as suas informações de
        usuário.
      </h1>
      <a href="http://localhost:8080/login">
        <button className={styles.spotifyLoginButton}>
          <img
            src="https://seeklogo.com/images/S/spotify-logo-4FFDEEE153-seeklogo.com.png"
            alt="Spotify Logo"
            className={styles.spotifyLogo}
          />
          Conectar com Spotify
        </button>
      </a>
    </div>
  );
};

export default Login;
