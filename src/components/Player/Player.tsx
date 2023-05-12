import { fetchBackground, fetchPlaybackStatus } from "@/redux/request-slice";
import { IoIosPlayCircle } from "react-icons/io";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import styles from "../Player/Player.module.css";
import { Album } from "@/types/album";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const index = () => {
  const token = useSelector((state: RootState) => state.requests.token);
  const backgroundPlayer = useSelector(
    (state: RootState) => state.requests.backgroundPlayer
  );
  const playing = useSelector((state: RootState) => state.requests.playing);
  const dispatch = useDispatch();

  async function getBackground(artistIdImage: string, token: string) {
    await fetch(`https://api.spotify.com/v1/artists/${artistIdImage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => await response.json())
      .then(async (data) => {
        const dataRes = await data.images;
        const url = await dataRes[0].url;
        dispatch(fetchBackground(url));
      });
  }

  const fetchData = async (token: string) => {
    await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => await response.json())
      .then(async (data) => {
        const dataResponse = await data.item.album;
        const { images, artists } = dataResponse;
        const newAlbum: Album = {
          name: data.item.name,
          artists: artists[0].id,
          artistName: artists[0].name,
          images: images[0].url,
        };
        getBackground(newAlbum.artists, token);
        dispatch(fetchPlaybackStatus(newAlbum));
      });
  };
  return (
    <>
      <div className={styles.albumContainer}>
        <div className={styles.cardMusic}>
          <h2 className={styles.tocando}>Tocando Agora</h2>
          <img
            src={backgroundPlayer}
            alt="undefined"
            className={styles.albumImage}
          />
          <span className={styles.iconsPlayer}>
            <MdSkipPrevious />
            <IoIosPlayCircle />
            <MdSkipNext />
          </span>
          <p className={styles.albumName}>{playing.name}</p>
          <p className={styles.albumName}>{playing.artistName}</p>
          <button onClick={() => fetchData(token)}>Listar</button>
        </div>
      </div>
    </>
  );
};

export default index;
