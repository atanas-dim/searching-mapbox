import React, { useEffect, useState } from "react";
import PlaceItem from "../PlaceItem/PlaceItem";
import ShowHideButton from "../ShowHideButton/ShowHideButton";
import "./PlacesPanel.scss";

const PlacesPanel = ({ state, updateState }) => {
  const places = state.places;
  const [isScrollable, setIsScrollable] = useState(false);
  const [hasFadeTop, setHasFadeTop] = useState(false);
  const [hasFadeBottom, setHasFadeBottom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let placesDiv;
  let scrollTop = 0;
  let scrollHeight = 0;
  let offsetHeight = 0;

  // Toggling the fading on scroll
  const toggleFade = () => {
    placesDiv = document.getElementById("places");
    // console.log(placesDiv);
    scrollTop = placesDiv.scrollTop;
    scrollHeight = placesDiv.scrollHeight;
    offsetHeight = placesDiv.offsetHeight;

    // console.log(placesDiv);
    // console.log(scrollHeight);
    // console.log(offsetHeight);

    scrollHeight > offsetHeight
      ? setHasFadeBottom(true)
      : setHasFadeBottom(false);
    scrollTop > 0 ? setHasFadeTop(true) : setHasFadeTop(false);
    scrollTop >= scrollHeight - offsetHeight
      ? setHasFadeBottom(false)
      : setHasFadeBottom(true);

    scrollHeight > offsetHeight
      ? setIsScrollable(true)
      : setIsScrollable(false);
  };

  useEffect(() => {
    toggleFade();
    placesDiv.onscroll = toggleFade;
  }, []);

  useEffect(() => {
    toggleFade();
    if (places.length) setIsOpen(true);
  }, [places]);

  const showHideResults = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="places-container">
      <div
        className={`places-panel ${!isOpen ? "minimized" : ""}`}
        id="places-panel"
      >
        <div
          className="fade-top"
          id="fade-top"
          style={{ opacity: `${hasFadeTop ? 0.8 : 0}` }}
        ></div>
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
        <div
          className="fade-bottom"
          id="fade-bottom"
          style={{ opacity: `${hasFadeBottom ? 0.8 : 0}` }}
        ></div>
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
