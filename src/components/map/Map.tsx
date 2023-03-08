import React, { useEffect } from "react";
import mapbox from "mapbox-gl";
import "./Map.scss";
import { useMap } from "src/context/MapContext";

const Map = ({ state, updateState }: any) => {
  const { map: mapRef } = useMap();

  useEffect(() => {
    if (mapRef.current) return;

    mapbox.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";

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
      // userLocation.trigger();
    });

    userLocation.on("trackuserlocationend", (event: any): void => {
      const longitude = event?.target._accuracyCircleMarker._lngLat.lng;
      const latitude = event?.target._accuracyCircleMarker._lngLat.lat;

      updateState({ longitude: longitude, latitude: latitude });
    });

    userLocation.on("geolocate", (event: any): void => {
      const longitude = event?.target._accuracyCircleMarker._lngLat.lng;
      const latitude = event?.target._accuracyCircleMarker._lngLat.lat;

      updateState({ longitude: longitude, latitude: latitude });
    });

    // Adds navigation controls
    // const navigation = new mapbox.NavigationControl();
    // mapRef.current.addControl(navigation, "top-right");

    //Add this map instance to the app state
    updateState({ map: mapRef.current });
  }, [
    mapRef,
    state.latitude,
    state.longitude,
    state.style,
    state.zoom,
    updateState,
  ]);

  useEffect(() => {
    if (state.map) {
      state.map.setStyle(state.style);
    }
  }, [state.map, state.style]);

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
