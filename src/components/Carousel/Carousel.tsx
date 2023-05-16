import React from "react";
import styles from "../Carousel/Carousel.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Album } from "@/types/album";
import CardMusic from "../Card/CardMusic";
import CardArtist from "../Card/CardArtist";

type CardContent = {
  albunsType: string;
  contentType: Album[];
};
const Carousel = ({ albunsType, contentType }: CardContent) => {
  const track = useSelector((state: RootState) => state.requests.tracks);
  const playing = useSelector((state: RootState) => state.requests.playing);
  const lastTracks = track.slice(-9);

  return (
    <div className={styles.cardContainer}>
      {lastTracks.map((track: Album) => {
        return albunsType == "Artistas mais Ouvidos" ? (
          <CardArtist
            artistName={track.artistName}
            images={playing.artistPhoto}
          />
        ) : (
          <CardMusic
            track={track.name}
            images={track.image}
            artistName={track.artistName}
          />
        );
      })}
    </div>
  );
};

export default Carousel;
