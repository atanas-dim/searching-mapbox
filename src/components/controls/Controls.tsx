import React, { FC } from "react";
import { useMap } from "src/hooks/useMap";
import useGeolocControls, { BtnVariant } from "src/hooks/useGeolocControls";
import GeolocActiveAwayIcon from "src/components/icons/GeolocActiveAwayIcon";
import GeolocActiveIcon from "src/components/icons/GeolocActiveIcon";
import GeolocDisabledIcon from "src/components/icons/GeolocDisabledIcon";

import styles from "./Controls.module.scss";
import classNames from "classnames";
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";

const Controls: FC = () => {
  const { zoomIn, zoomOut, map } = useMap();

  const { handleGeolocClick, btnVariant } = useGeolocControls(map);

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleGeolocClick()}
        className={classNames(
          styles.geolocBtn,
          btnVariant === BtnVariant.Tracking && styles.tracking,
          btnVariant === BtnVariant.ActiveCentered && styles.active,
          btnVariant === BtnVariant.ActiveAway && styles.active
        )}
      >
        {btnVariant === BtnVariant.Off ? (
          <GeolocDisabledIcon />
        ) : btnVariant === BtnVariant.ActiveAway ? (
          <GeolocActiveAwayIcon />
        ) : (
          <GeolocActiveIcon />
        )}
      </button>
      <button onClick={() => zoomIn()} style={{ zIndex: 1000 }}>
        <PlusIcon />
      </button>
      <button onClick={() => zoomOut()} style={{ zIndex: 1000 }}>
        <MinusIcon />
      </button>
    </div>
  );
};

export default Controls;
