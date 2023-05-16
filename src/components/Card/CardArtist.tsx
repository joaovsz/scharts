import React from "react";
import styles from "../Card/CardMusic.module.css";

type CardArtistProps = {
  artistName: string;
  images: string;
};
const CardArtist = ({ artistName, images }: CardArtistProps) => {
  return (
    <>
      <div className={styles.card}>
        <img src={images} className={styles.musicImage} />
        <span className={styles.musicName}>
         {artistName}
        </span>
      </div>
    </>
  );
};

export default CardArtist;
