import React, { type FC, useEffect, useState } from "react";

import PlaceItem from "src/components/search/PlaceItem";
import { Place } from "src/components/search/Search";
import ShowHideButton from "src/components/showHideButton/ShowHideButton";
import { useMap } from "src/context/MapContext";

import styles from "./PlacesPanel.module.scss";

type Props = {
  places: Place[];
  removePlace: (index: number) => void;
};

const PlacesPanel: FC<Props> = ({ places, removePlace }) => {
  const { goToPlace } = useMap();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    places.length ? setIsOpen(true) : setIsOpen(false);
  }, [places]);

  const showHideResults = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.panel} ${
          !isOpen ? styles.collapsed : styles.open
        }`}
      >
        <div>
          {places.map((place, index) => {
            return (
              <PlaceItem
                key={`place-${index}`}
                index={index}
                place={place}
                goToPlace={goToPlace}
                removePlace={removePlace}
                showHideResults={showHideResults}
              />
            );
          })}
        </div>
      </div>

      {places.length > 0 && (
        <ShowHideButton
          showHideResults={showHideResults}
          label={isOpen ? "Hide results" : "Show results"}
        />
      )}
    </div>
  );
};

export default PlacesPanel;
