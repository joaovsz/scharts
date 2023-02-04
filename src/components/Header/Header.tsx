import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";
export const Header = () => {
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.userContainer}>
          <div className={styles.userContent}>
            <img src="" />
            <h1>João Vitor Souza</h1>
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
      </header>
    </>
  );
};
