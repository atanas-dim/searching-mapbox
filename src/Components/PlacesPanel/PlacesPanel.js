import React, { useEffect, useState } from "react";
import PlaceItem from "../PlaceItem/PlaceItem";
import ShowHideButton from "../ShowHideButton/ShowHideButton";
import "./PlacesPanel.scss";

const PlacesPanel = ({ state, updateState }) => {
  const places = state.places;
  const [isScrollable, setIsScrollable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let placesPanel;
  let scrollTop = 0;
  let scrollHeight = 0;
  let offsetHeight = 0;

  // Check if the panel is scrollable
  const checkIsScrollable = () => {
    placesPanel = document.getElementById("places-panel");
    scrollTop = placesPanel.scrollTop;
    scrollHeight = placesPanel.scrollHeight;
    offsetHeight = placesPanel.offsetHeight;
    // console.log(scrollTop);
    // console.log(scrollHeight);
    // console.log(offsetHeight);

    scrollHeight > offsetHeight
      ? setIsScrollable(true)
      : setIsScrollable(false);
  };

  useEffect(() => {
    checkIsScrollable();

    let vh = window.innerHeight * 0.01;
    // placesPanel = document.getElementById("places-panel");
    placesPanel.style.maxHeight = 70 * vh + "px";
  }, []);

  useEffect(() => {
    checkIsScrollable();
    if (places.length) setIsOpen(true);
  }, [places]);

  const showHideResults = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="places-container" id="places-container">
      <div
        className={`places-panel ${!isOpen ? "minimized" : ""}`}
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
              ></PlaceItem>
            );
          })}
        </div>
      </div>
      {isScrollable && (
        <ShowHideButton
          showHideResults={showHideResults}
          buttonText={isOpen ? "Hide results" : "Show results"}
        />
      )}
    </div>
  );
};

export default PlacesPanel;
