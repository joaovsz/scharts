import React, { useEffect, useState } from "react";
import styles from "../Carousel/Carousel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Album } from "@/types/album";
import CardMusic from "../Cards/CardMusic";

import { fetchRecentPlayed } from "@/redux/request-slice";
import CardSkeleton from "../Cards/CardSkeleton";

type CardContent = {
  albunsType: string;
  contentType: Album[];
};
const Carousel = ({ albunsType, contentType }: CardContent) => {
  const track = useSelector((state: RootState) => state.requests.tracks);
  const isLoggedIn = useSelector(
    (state: RootState) => state.requests.isLoggedIn
  );
  const token = useSelector((state: RootState) => state.requests.token);
  const recentPlayed = useSelector(
    (state: RootState) => state.requests.recentPlayed
  );
  const dispatch = useDispatch();

  const recentPlayedSliced = recentPlayed.slice(-9);
  const lastTracks = track.slice(-9);
  const [aux, setAux] = useState(false);

  useEffect(() => {
    const repeatFetch = async () => {
      await fetchData(token);
      console.log("Executando minha função assíncrona...");
    };

    const intervalId = setTimeout(async () => {
      if (token == "") {
        return null;
      } else {
        await repeatFetch();
        clearTimeout(intervalId);
      }
    }, 6000);

    return () => clearTimeout(intervalId);
  }, [aux, token]);

  async function fetchData(token: string) {
    await fetch("https://api.spotify.com/v1/me/player/recently-played", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => await response.json())
      .then(async (data) => {
        const tracks = data.items;
        tracks.forEach((track: any) => {
          const data = track.track.album;
          const newAlbum: Album = {
            name: data.name,
            artists: data.artists[0].id,
            artistName: data.artists[0].name,
            image: data.images[0].url,
            artistPhoto: "",
          };
          dispatch(fetchRecentPlayed(newAlbum));
          setAux(!aux);
        });
      });
  }
  return (
    <div className={styles.cardContainer}>
      {albunsType == "Ouvidas Recentemente" ? (
        isLoggedIn == true && track.length > 0 ? (
          recentPlayedSliced.map((track: Album) => {
            return (
              <CardMusic
                track={track.name}
                images={track.image}
                artistName={track.artistName}
              />
            );
          })
        ) : (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )
      ) : isLoggedIn == true && track.length > 0 ? (
        lastTracks.map((track: Album) => {
          return (
            <CardMusic
              track={track.name}
              images={track.image}
              artistName={track.artistName}
            />
          );
        })
      ) : (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
    </div>
  );
};

export default Carousel;
function dispatch(arg0: {
  payload: Album;
  type: "requests/fetchRecentPlayed";
}) {
  throw new Error("Function not implemented.");
}
