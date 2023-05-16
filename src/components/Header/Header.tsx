import { getAuthParams, handleLogin } from "@/redux/request-slice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Header.module.css";
import Player from "../Player/Player";
export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.requests.isLoggedIn
  );
  const user = useSelector((state: RootState) => state.requests.user);

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.userContainer}>
          <div className={styles.userContent}>
            <img src={user.perfil} className={styles.userPhoto} />
            {isLoggedIn ? (
              <span className={styles.userName}>{user.name}</span>
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
