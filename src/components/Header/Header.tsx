import { getAuthParams, getUser } from "@/redux/request-slice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import Player from "../Player/Player";
import { User } from "@/types/User";
export const Header = () => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);
  const isLoggedIn = useSelector(
    (state: RootState) => state.requests.isLoggedIn
  );
  const user = useSelector((state: RootState) => state.requests.user);
  const token = useSelector((state: RootState) => state.requests.token);
  useEffect(() => {
    const repeatFetch = async () => {
      await fetchCurrentUser(token);
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

  async function fetchCurrentUser(token: string) {
    await fetch("https://api.spotify.com/v1/users/227a6pzp3kiisicws7hj26kiy", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => await response.json())
      .then(async (data) => {
        const dataResponse = await data;
        const User = {
          name: await dataResponse.display_name,
          profilePhoto: await dataResponse.images[0].url,
        } as User;
        console.log(dataResponse);
        dispatch(getUser(User));
        setAux(!aux);
      });
  }
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.userContainer}>
          <div className={styles.userContent}>
            {isLoggedIn ? (
              <>
                <img src={user.profilePhoto} className={styles.userPhoto} />
                <span className={styles.userName}>{user.name}</span>
              </>
            ) : (
              <a href="http://localhost:8080/login">Conecte-se</a>
            )}
          </div>
        </div>
        <div className={styles.container}>
          <h2>Estatísticas</h2>
          <ul className={styles.listContainer}>
            <Link href={"/artists"}>
              <li className={styles.option}>Artistas mais ouvidos</li>
            </Link>
            <Link href={"/albuns"}>
              <li className={styles.option}>Albuns mais ouvidos</li>
            </Link>
            <Link href={"/tracks"}>
              <li className={styles.option}>Músicas mais ouvidas</li>
            </Link>
          </ul>
        </div>
        <Player />
      </header>
    </>
  );
};
