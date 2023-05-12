import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Albuns.module.css";
import { RootState } from "@/redux/store";
import { fetchBackground, fetchPlaybackStatus } from "@/redux/request-slice";
import { Album } from "@/types/album";
import Player from "../Player/Player";

export const Albuns = () => {
  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.albumRow}>
          <Player />
        </div>
      </main>
    </>
  );
};
