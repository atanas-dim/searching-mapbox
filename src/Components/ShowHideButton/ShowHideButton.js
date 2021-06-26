import React from "react";
import "./ShowHideButton.scss";

const ShowHideButton = ({ showHideResults, buttonText }) => {
  return (
    <div
      className="mapboxgl-ctrl mapboxgl-ctrl-group show-hide-container"
      id="show-hide-container"
    >
      <button className="show-hide-btn" onClick={() => showHideResults()}>
        {buttonText}
      </button>
    </div>
  );
};

export default ShowHideButton;
