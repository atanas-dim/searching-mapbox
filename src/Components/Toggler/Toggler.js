import React from "react";
import "./Toggler.scss";

const Toggler = ({ state, updateState }) => {
  const styles = [
    {
      name: "Satellite",
      url: "mapbox://styles/mapbox/satellite-streets-v11",
      theme: "light",
    },
    {
      name: "Light",
      url: "mapbox://styles/mapbox/light-v10",
      theme: "light",
    },
    {
      name: "Dark",
      url: "mapbox://styles/mapbox/dark-v10",
      theme: "dark",
    },
  ];

  const buttons = styles.map((style, index) => {
    let className = style.url === state.style ? "selected" : "";

    const settings = {
      style: style.url,
      theme: style.theme,
    };

    return (
      <button
        onClick={() => {
          updateState(settings);
        }}
        key={`styleBtn${index}`}
        className={className}
      >
        {style.name}
      </button>
    );
  });

  return (
    <div className="toggler-container">
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-ctrl-group-horizontal toggler">
        {buttons}
      </div>
    </div>
  );
};

export default Toggler;
