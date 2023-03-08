import React, { useEffect, useState } from "react";
import PlaceItem from "../placeItem/PlaceItem";
import ShowHideButton from "../showHideButton/ShowHideButton";
import "./PlacesPanel.scss";

const PlacesPanel = ({ state, updateState }) => {
  const places = state.places;
  // isOpen must be true on render for the scrollbar to work
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    places.length ? setIsOpen(true) : setIsOpen(false);
  }, [places]);

  const showHideResults = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="places-container" id="places-container">
      <div
        className={`places-panel ${!isOpen ? "collapsed" : "open"}`}
        id="places-panel"
      >
        <div className="places" id="places">
          {places.map((place, index) => {
            return (
              <PlaceItem
                place={place}
                state={state}
                updateState={updateState}
                key={`place${index}`}
                showHideResults={showHideResults}
              ></PlaceItem>
            );
          })}
        </div>
      </div>

      {places.length > 0 && (
        <ShowHideButton
          showHideResults={showHideResults}
          buttonText={isOpen ? "Hide results" : "Show results"}
        />
      )}
    </div>
  );
};

export default PlacesPanel;
