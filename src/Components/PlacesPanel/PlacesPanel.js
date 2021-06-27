import React, { useEffect, useState } from "react";
import PlaceItem from "../PlaceItem/PlaceItem";
import ShowHideButton from "../ShowHideButton/ShowHideButton";
import ScrollBar from "../ScrollBar/ScrollBar";
import "./PlacesPanel.scss";

const PlacesPanel = ({ state, updateState }) => {
  const places = state.places;
  const [isScrollable, setIsScrollable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    checkIsScrollable();
    places.length ? setIsOpen(true) : setIsOpen(false);
  }, [places]);

  let placesPanel;
  let scrollTop = 0;
  let scrollHeight = 0;
  let offsetHeight = 0;

  // Check if the panel is scrollable to show toggle button at the bottom
  const checkIsScrollable = () => {
    placesPanel = document.getElementById("places-panel");
    scrollTop = placesPanel.scrollTop;
    scrollHeight = placesPanel.scrollHeight;
    offsetHeight = placesPanel.offsetHeight;

    placesPanel.onscroll = updateScrollValues;

    scrollHeight > offsetHeight
      ? setIsScrollable(true)
      : setIsScrollable(false);
  };

  const updateScrollValues = () => {
    scrollTop = placesPanel.scrollTop;
    scrollHeight = placesPanel.scrollHeight;
    offsetHeight = placesPanel.offsetHeight;

    setScrollPercentage((scrollTop / (scrollHeight - offsetHeight)) * 50);
  };

  useEffect(() => {
    checkIsScrollable();
  }, []);

  const showHideResults = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="places-container" id="places-container">
      <div className={`places-panel-wrapper `}>
        {isScrollable && (
          <ScrollBar scrollPercentage={scrollPercentage} isOpen={isOpen} />
        )}

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
