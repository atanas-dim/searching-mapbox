import React, { FC, MutableRefObject } from "react";

import { Place } from "./Search";

import Spinner from "src/components/loading/Spinner";
import PlacesPanel from "src/components/search/PlacesPanel";

import styles from "./Results.module.scss";
import { Marker } from "mapbox-gl";

type Props = {
  isLoading: boolean;
  error: boolean;
  results: Place[];
  updatePlaces: (updatedPlaces: Place[]) => void;
  markers: MutableRefObject<Marker[]>;
};

const Results: FC<Props> = ({
  isLoading,
  error,
  results,
  updatePlaces,
  markers,
}) => {
  const showFallback = isLoading || error;

  if (showFallback)
    return (
      <div className={styles.container}>
        {isLoading && (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )}
        {error && (
          <div className={styles.error}>
            Something went wrong.
            <br /> Try again.
          </div>
        )}
      </div>
    );

  const removePlace = (index: number) => {
    const updatedPlaces = [...results];
    updatedPlaces.splice(index, 1);

    updatePlaces(updatedPlaces);

    markers.current?.[index].remove();
    const updatedMarkers = [...markers.current];
    updatedMarkers.splice(index, 1);
    markers.current = updatedMarkers;
  };

  return <PlacesPanel places={results} removePlace={removePlace} />;
};

export default Results;
