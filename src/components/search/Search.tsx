import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import mapboxgl, { LngLatLike, Marker } from "mapbox-gl";

import { useMap } from "src/context/MapContext";

import Results from "src/components/search/Results";

import { findNearbyPlaces } from "src/resources/search";

import styles from "./Search.module.scss";

type PlaceContext = {
  id: string;
  mapbox_id: string;
  text: string;
};
export type Place = {
  text: string;
  center: LngLatLike;
  properties: { address: string };
  context: PlaceContext[];
};

type SearchState = {
  searchTerm: string;
  isLoading: boolean;
  error: boolean;
  results: Place[];
};

const Search = () => {
  const { currentLocation, map, goToPlace } = useMap();

  const markers = useRef<Marker[]>([]);

  const [searchState, setSearchState] = useState<SearchState>({
    searchTerm: "",
    isLoading: false,
    error: false,
    results: [],
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchState((prevState) => {
      return { ...prevState, searchTerm: event.target.value };
    });
  };

  const clearMarkers = () => {
    markers.current.forEach((marker) => marker.remove());
  };

  const createMarkers = (results: Place[]): void => {
    if (!map) return;

    results.forEach((result) => {
      const [lng, lat] = result.center as number[];

      const marker = new mapboxgl.Marker({ color: "#42a5f5" }) // TODO Create named var for blue
        .setLngLat({
          lng,
          lat,
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!map) return;

    if (!searchState.searchTerm.trim()) return;

    const { target } = event;
    const input = (target as HTMLFormElement)?.firstChild;
    (input as HTMLInputElement)?.blur();

    if (markers.current.length) clearMarkers();

    setSearchState((prevState) => {
      return { ...prevState, isLoading: true, error: false };
    });

    findNearbyPlaces(searchState.searchTerm, currentLocation)
      .then((response) => {
        setSearchState((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            error: false,
            results: response.features,
          };
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
          value={searchState.searchTerm}
          onChange={handleChange}
          placeholder="Search for a place"
        />
      </form>
      <Results
        {...{
          isLoading: searchState.isLoading,
          error: searchState.error,
          results: searchState.results,
          markers,
          updatePlaces: (updatedPlaces: Place[]) =>
            setSearchState((prevState) => ({
              ...prevState,
              results: updatedPlaces,
            })),
        }}
      />
    </div>
  );
};

export default Search;
