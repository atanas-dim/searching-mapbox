import mapboxgl from "mapbox-gl";
import React from "react";
import { useMap } from "src/context/MapContext";

import "./Map.scss";

const Map = () => {
  const { zoomIn, zoomOut, findUserLocation } = useMap();

  return (
    <>
      <div id="map" />
      <div style={{ position: "fixed" }}>
        <button onClick={() => zoomIn()} style={{ zIndex: 1000 }}>
          Zoom in
        </button>
        <button onClick={() => zoomOut()} style={{ zIndex: 1000 }}>
          Zoom out
        </button>

        <button onClick={() => findUserLocation()} style={{ zIndex: 1000 }}>
          Geoloc
        </button>
      </div>
    </>
  );
};

export default Map;
