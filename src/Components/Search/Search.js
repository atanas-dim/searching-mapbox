import React, { useState } from "react";
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

    const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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
    <div className="search-container">
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
    </div>
  );
};

export default Search;
