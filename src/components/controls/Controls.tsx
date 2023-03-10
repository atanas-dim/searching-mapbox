import React, { FC } from "react";
import { useMap } from "src/context/MapContext";
import useGeolocControls, { BtnVariant } from "src/hooks/useGeolocControls";

import styles from "./Controls.module.scss";

const Controls: FC = () => {
  const { zoomIn, zoomOut, map } = useMap();

  const { handleGeolocClick, isTrackingUserLoc, geolocIsActive, btnVariant } =
    useGeolocControls(map);

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleGeolocClick()}
        style={{
          zIndex: 1000,
        }}
        className={
          btnVariant === BtnVariant.Tracking
            ? styles.trackingActive
            : btnVariant === BtnVariant.ActiveCentered
            ? styles.geolocActive
            : btnVariant === BtnVariant.ActiveAway
            ? "" // TODO Add style or replace with icons
            : ""
        }
      >
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
