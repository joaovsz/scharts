import React from "react";
import styles from "./CardMusic.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchRecentPlayed } from "@/redux/request-slice";
import { Album } from "@/types/album";

type CardArtistProps = {
  artistName: string;
  images: string;
};

const CardArtist = ({ artistName, images }: CardArtistProps) => {
  const token = useSelector((state: RootState) => state.requests.token);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.card}>
        <img src={images} className={styles.musicImage} />
        <span className={styles.musicName}>{artistName}</span>
      </div>
    </>
  );
};

export default CardArtist;
