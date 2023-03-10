import React, {
  useEffect,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import mapboxgl, { Map } from "mapbox-gl";

type MapConfig = {
  latitude: number;
  longitude: number;
  style: string;
  theme: "light" | "dark" | "satellite";
  zoom: number;
  // places: [// {name: "Test place 1", latitude: 51.509865, longitude: -0.118092},];
};

const INITIAL_MAP_CONFIG: MapConfig = {
  latitude: 51.509865,
  longitude: -0.118092,
  style: "mapbox://styles/mapbox/dark-v10",
  theme: "dark",
  zoom: 12,
  // places: [
  //   // {name: "Test place 1", latitude: 51.509865, longitude: -0.118092},
  // ],
};

type ContextValue = {
  map: Map | undefined;
};

const INITIAL_STATE = {
  map: undefined,
};

export const MapContext = createContext<ContextValue>(INITIAL_STATE);

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    if (!map) {
      const mapbox = new mapboxgl.Map({
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "",
        container: "map",
        style: INITIAL_MAP_CONFIG.style,
        center: [INITIAL_MAP_CONFIG.longitude, INITIAL_MAP_CONFIG.latitude],
        zoom: INITIAL_MAP_CONFIG.zoom,
        attributionControl: false,
        localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
        logoPosition: "bottom-right",
      });

      setMap(mapbox);
    }
  }, [map]);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     mapRef.current.setStyle(state.style);
  //   }
  // }, [state.style]);

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  const context = useContext(MapContext);

  const { map } = context;

  const zoomIn = () => map?.zoomIn();
  const zoomOut = () => map?.zoomOut();

  return { map, zoomIn, zoomOut };
};

// The HOC can wrap a page component on private routes
export const withMapProvider = (Component: any) => {
  const WithMapProvider = (props: any) => {
    return (
      <MapProvider>
        <Component {...props} />
      </MapProvider>
    );
  };
  WithMapProvider.displayName = "withMapProvider";
  return WithMapProvider;
};
