import { LngLatLike } from "mapbox-gl";
import { useContext } from "react";
import { MapContext } from "src/context/MapContext";

export const useMap = () => {
  const context = useContext(MapContext);

  const { map, style, setStyle, currentLocation, setCurrentLocation } = context;

  const zoomIn = () => map?.zoomIn();
  const zoomOut = () => map?.zoomOut();
  const goToPlace = (center: LngLatLike) =>
    map?.easeTo({
      center,
      zoom: 16,
      duration: 1800,
    });

  return {
    map,
    zoomIn,
    zoomOut,
    goToPlace,
    style,
    setStyle,
    currentLocation,
    setCurrentLocation,
  };
};

export default useMap;
