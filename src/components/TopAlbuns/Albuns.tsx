import React, { useEffect } from "react";
import { handleLogin } from "../../redux/request-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Albuns.module.css";
export const Albuns = () => {
  const dispatch = useDispatch();
  const token = useSelector((store: any) => store.requests.token);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me/player", {
      headers: { Authorization: "Bearer" + token },
    }).then;
  });

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.albumRow}>
          <div className={styles.albumContainer}>
            <img />
            <p className={styles.albumName}>Album Name</p>
          </div>
        </div>
        <button>Listar</button>
      </main>
    </>
  );
};
