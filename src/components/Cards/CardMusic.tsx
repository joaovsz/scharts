import React from "react";
import styles from "../Cards/CardMusic.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
type CardMusicProps = {
  track: string;
  artistName: string;
  images: string;
};
const CardMusic = ({ track, artistName, images }: CardMusicProps) => {
  return (
    <>
      <div className={styles.card}>
        <img src={images} className={styles.musicImage} />
        <span className={styles.musicName}>
          {track} - {artistName}
        </span>
      </div>
    </>
  );
};

export default CardMusic;
