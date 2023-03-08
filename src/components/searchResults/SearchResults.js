import React from "react";
import SearchMessage from "../searchMessage/SearchMessage";
import PlacesPanel from "../placesPanel/PlacesPanel";

const SearchResults = ({ state, updateState, searchState }) => {
  if (searchState.isLoading) {
    return <SearchMessage message="Loading..." />;
  }

  if (searchState.error) {
    console.log("search error");
    return <SearchMessage message="Search failed. Try again." />;
  }

  return <PlacesPanel state={state} updateState={updateState} />;
};

export default SearchResults;
