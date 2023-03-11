import React, { useState } from "react";
import { useMap } from "src/context/MapContext";
// import SearchResults from "../searchResults/SearchResults";
import styles from "./Search.module.scss";
import mapboxgl from "mapbox-gl";

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

type SearchResult = {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  address: string;
  context: PlaceContext[];
};

const Search = () => {
  const { currentLocation, map } = useMap();

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

  const createMarkers = (results: SearchResult[]): void => {
    //
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!map) return;

    if (!searchState.value.trim()) return;

    setSearchState((prevState) => {
      return { ...prevState, isLoading: true, error: false };
    });

    const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const proximity = `${currentLocation.longitude},${currentLocation.latitude}`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchState.value}.json?limit=10&proximity=${proximity}&access_token=${accessToken}`;

    // TODO Move outside component
    // Add axios if needed
    await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((jsonResponse) => {
        setSearchState((prevState) => {
          return { ...prevState, isLoading: false, error: false };
        });

        const results: SearchResult[] = jsonResponse.features.map(
          (place: Place, index: number) => {
            return {
              id: index,
              name: place.text,
              longitude: place.center[0],
              latitude: place.center[1],
              address: place.properties.address,
              context: place.context,
            };
          }
        );

        createMarkers(results);

        console.log({ results });

        results.forEach((result) => {
          new mapboxgl.Marker({ color: "#42a5f5" }) // TODO Create named var for blue
            .setLngLat({
              lng: result.longitude,
              lat: result.latitude,
            })
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${result.name}</h3><p>${result.address}</p>`
              )
            )
            .addTo(map);
        });
      })
      .catch((error) => {
        console.error({ error });
        setSearchState((prevState) => {
          return { ...prevState, isLoading: false, error: true };
        });
      });

    setSearchState((prevState) => {
      return { ...prevState, value: "" };
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
