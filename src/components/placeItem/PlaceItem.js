import React, { useEffect } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapbox from "!mapbox-gl";
import "./PlaceItem.scss";

const PlaceItem = ({ place, state, updateState, showHideResults }) => {
  const map = state.map;

  useEffect(() => {
    if (map) {
      const popUp = new mapbox.Popup()
        .setHTML(
          `<p>${place.name}</p><p>${place.address}</p> <p>${place.context[0].text}</p>`
        )
        .setMaxWidth("300px")
        .addTo(map);

      const marker = new mapbox.Marker({
        color: "#2196f3",
      })
        .setLngLat([place.longitude, place.latitude])
        .setPopup(popUp)
        .addTo(map);

      return () => {
        marker.remove();
      };
    }
  }, [place, map]);

  const goTo = () => {
    map.easeTo({
      center: [place.longitude, place.latitude],
      zoom: 16,
      duration: 1800,
    });
  };

  const handleKeyDown = (event) => {
    console.log(event.key);
  };

  const handleClick = () => {
    goTo();
    if (window.innerWidth < 420) showHideResults();
  };

  const removePlace = () => {
    const filteredPlaces = state.places.filter(
      (existingPlace) => existingPlace.id !== place.id
    );
    updateState({ places: filteredPlaces });
  };

  return (
    <div className="place-item" onKeyDown={handleKeyDown}>
      <div className="place-details" onClick={() => handleClick()}>
        <h4>{place.name}</h4>
        <p>
          <span>{place.address ? place.address : ""}</span>
        </p>
        <p>{place.context[0].text}</p>
      </div>

      <div className="close-holder">
        <button className="close-btn" onClick={() => removePlace()}></button>
      </div>
    </div>
  );
};

export default PlaceItem;
