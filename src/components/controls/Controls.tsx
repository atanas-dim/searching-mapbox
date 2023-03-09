import React, { FC } from "react";
import { useMap } from "src/context/MapContext";

import styles from "./Controls.module.scss";

const Controls: FC = () => {
  const { zoomIn, zoomOut, findUserLocation } = useMap();
  return (
    <div className={styles.container}>
      <button onClick={() => findUserLocation()} style={{ zIndex: 1000 }}>
        📍
      </button>
      <button onClick={() => zoomIn()} style={{ zIndex: 1000 }}>
        ＋
      </button>
      <button onClick={() => zoomOut()} style={{ zIndex: 1000 }}>
        −
      </button>
    </div>
  );
};

export default Controls;
