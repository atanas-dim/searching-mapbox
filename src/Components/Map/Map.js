import React, { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapbox from "!mapbox-gl";
import "./Map.scss";

const Map = ({ state, updateState }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapbox.accessToken =
      "pk.eyJ1IjoiYXRhbmFzZGltIiwiYSI6ImNrcHI5OWwxNTAyOGkycXBzY3poenZzbmIifQ.89P2_0OkKWuRAd93Od68KQ";

    // Creates a map instance
    mapRef.current = new mapbox.Map({
      container: "map",
      style: state.style,
      center: [state.longitude, state.latitude],
      zoom: state.zoom,
      attributionControl: false,
      localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
      logoPosition: "bottom-right",
    });

    // Adds user tracker
    const userLocation = new mapbox.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    mapRef.current.addControl(userLocation, "top-right");

    // Start current user location on load
    mapRef.current.on("load", function () {
      userLocation.trigger();
    });

    userLocation.on("trackuserlocationend", function (event) {
      const longitude = event.target._accuracyCircleMarker._lngLat.lng;
      const latitude = event.target._accuracyCircleMarker._lngLat.lat;

      updateState({ longitude: longitude, latitude: latitude });
    });

    userLocation.on("geolocate", function (event) {
      const longitude = event.target._accuracyCircleMarker._lngLat.lng;
      const latitude = event.target._accuracyCircleMarker._lngLat.lat;

      updateState({ longitude: longitude, latitude: latitude });
    });

    // Adds navigation controls
    // const navigation = new mapbox.NavigationControl();
    // mapRef.current.addControl(navigation, "top-right");

    //Add this map instance to the app state
    updateState({ map: mapRef.current });
  }, []);

  useEffect(() => {
    if (state.map) {
      state.map.setStyle(state.style);
    }
  }, [state.style]);

  return (
    <>
      <div id="map"></div>
      <button onClick={() => mapRef.current.zoomIn()} style={{ zIndex: 1000 }}>
        Zoom in{" "}
      </button>
    </>
  );
};

export default Map;
