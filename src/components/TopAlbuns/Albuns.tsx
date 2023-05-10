import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Albuns.module.css";
import { RootState } from "@/redux/store";
import { fetchPlaybackStatus } from "@/redux/request-slice";
export const Albuns = () => {
  const [player, setPlayer] = useState(null);
  const token = useSelector(
    (state: RootState) => state.requests.params.access_token
  );
  const dispatch = useDispatch();

  const fetchData = () => {
    const result = fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(result);
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.albumRow}>
          <div className={styles.albumContainer}>
            <img />
            <p className={styles.albumName}>Album Name</p>
          </div>
        </div>
        <button onClick={() => fetchData()}>Listar</button>
      </main>
    </>
  );
};
