import React, { useState } from "react";
import PlacesPanel from "../PlacesPanel/PlacesPanel";
import SearchResults from "../SearchResults/SearchResults";
import "./Search.scss";

const Search = ({ state, updateState }) => {
  const [searchState, setSearchState] = useState({
    value: "",
    isLoading: false,
    error: false,
  });

  const handleChange = (event) => {
    setSearchState((prevState) => {
      return { ...prevState, value: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!searchState.value.trim()) {
      return;
    }

    setSearchState((prevState) => {
      return { ...prevState, isLoading: true, error: false };
    });

    const accessToken =
      "pk.eyJ1IjoiYXRhbmFzZGltIiwiYSI6ImNrcHI5OWwxNTAyOGkycXBzY3poenZzbmIifQ.89P2_0OkKWuRAd93Od68KQ";

    const proximity = `${state.longitude}, ${state.latitude}`;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchState.value}.json?limit=10&proximity=${proximity}&access_token=${accessToken}`;

    const placesData = await fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((jsonResponse) => {
        // console.log(jsonResponse);

        setSearchState((prevState) => {
          return { ...prevState, isLoading: false, error: false };
        });

        const results = jsonResponse.features.map((place, index) => {
          return {
            id: index,
            name: place.text,
            longitude: place.center[0],
            latitude: place.center[1],
            address: place.properties.address,
            context: place.context,
          };
        });

        updateState({ places: results });
      })
      .catch((error) => {
        setSearchState((prevState) => {
          return { ...prevState, isLoading: false, error: true };
        });
      });

    setSearchState((prevState) => {
      return { ...prevState, value: "" };
    });
  };

  return (
    <>
      <form className="search-form mapboxgl-ctrl-group" onSubmit={handleSubmit}>
        <input
          value={searchState.value}
          onChange={handleChange}
          placeholder="Search for a place"
        />
      </form>
      <SearchResults
        state={state}
        updateState={updateState}
        searchState={searchState}
      />
    </>
  );
};

export default Search;
