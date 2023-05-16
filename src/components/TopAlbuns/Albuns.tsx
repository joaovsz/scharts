import React, { useEffect, useState } from "react";
import styles from "./Albuns.module.css";
import Carousel from "../Carousel/Carousel";
import { Album } from "@/types/album";
type albunsProps = {
  albunsType: string;
  contentType: Album[];
};
export const Albuns = ({ albunsType, contentType }: albunsProps) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <h1>{albunsType}</h1>
        <div className={styles.albumRow}>
          <Carousel albunsType={albunsType} contentType={contentType} />
        </div>
      </div>
    </>
  );
};
