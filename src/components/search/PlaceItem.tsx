import React, { type FC } from "react";
import { Map, LngLatLike } from "mapbox-gl";

import { Place } from "src/components/search/Search";

import styles from "./PlaceItem.module.scss";
import PlusIcon from "../icons/PlusIcon";

type Props = {
  index: number;
  place: Place;
  goToPlace: (center: LngLatLike) => Map | undefined;
  showHideResults: () => void;
  removePlace: (index: number) => void;
};

const PlaceItem: FC<Props> = ({
  index,
  place,
  goToPlace,
  showHideResults,
  removePlace,
}) => {
  const handleClick = () => {
    goToPlace(place.center);
    if (window.innerWidth < 420) showHideResults();
  };

  return (
    <div className={styles.container}>
      <div className={styles.details} onClick={() => handleClick()}>
        <h4>{place.text}</h4>
        <span>
          {place.properties.address && <span>{place.properties.address}</span>}
        </span>
        <span>{place.context[0].text}</span>
      </div>

      <div className={styles.close} onClick={() => removePlace(index)}>
        <button onClick={() => {}}>
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default PlaceItem;
