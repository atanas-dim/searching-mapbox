import React, { useRef, useState } from "react";
import { useMap } from "src/context/MapContext";
// import SearchResults from "../searchResults/SearchResults";
import styles from "./Search.module.scss";
import mapboxgl, { Marker } from "mapbox-gl";
import { findNearbyPlaces } from "src/resources/search";

type PlaceContext = {
  id: string;
  mapbox_id: string;
  text: string;
};
type Place = {
  text: string;
  center: number[];
  properties: { address: string };
  context: PlaceContext[];
};

const Search = () => {
  const { currentLocation, map, goToPlace } = useMap();

  const markers = useRef<Marker[]>([]);

  const [searchState, setSearchState] = useState({
    value: "",
    isLoading: false,
    error: false,
  });

  const handleChange = (event: any) => {
    setSearchState((prevState) => {
      return { ...prevState, value: event.target.value };
    });
  };

  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.remove());
  };

  const createMarkers = (results: Place[]): void => {
    if (!map) return;

    results.forEach((result) => {
      const marker = new mapboxgl.Marker({ color: "#42a5f5" }) // TODO Create named var for blue
        .setLngLat({
          lng: result.center[0],
          lat: result.center[1],
        })
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="${styles.popup}"}><h4>${result.text}</h3><p>${result.properties.address}</p></div>`
          )
        )
        .addTo(map);

      markers.current.push(marker);
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!map) return;

    if (!searchState.value.trim()) return;

    if (markers.current.length) clearMarkers();

    setSearchState((prevState) => {
      return { ...prevState, isLoading: true, error: false };
    });

    findNearbyPlaces(searchState.value, currentLocation)
      .then((response) => {
        setSearchState((prevState) => {
          return { ...prevState, isLoading: false, error: false };
        });

        const firstResult = response.features[0];
        goToPlace(firstResult.center);
        createMarkers(response.features);
      })
      .catch((error) => {
        console.error({ error });
        setSearchState((prevState) => {
          return { ...prevState, isLoading: false, error: true };
        });
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          value={searchState.value}
          onChange={handleChange}
          placeholder="Search for a place"
        />
      </form>
      {/* <SearchResults
        state={state}
        updateState={updateState}
        searchState={searchState}
      /> */}
    </div>
  );
};

export default Search;
