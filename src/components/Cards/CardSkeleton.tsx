import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CardMusic.module.css";
const CardSkeleton = () => {
  return (
    <>
      <div className={styles.cardSkeleton}>
        <Skeleton
          height={170}
          borderRadius={9}
          baseColor={"#242323"}
          highlightColor={"#101010"}
        />
        <Skeleton
          style={{ padding: "0.6rem 0", marginTop: "0.6rem" }}
          height={"80%"}
          baseColor={"#242323"}
          highlightColor={"#101010"}
        />
      </div>
    </>
  );
};

export default CardSkeleton;
