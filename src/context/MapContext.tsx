import React, {
  useEffect,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

import mapboxgl, { Map } from "mapbox-gl";

import { MapStyleConfig, MAP_STYLES, StyleName } from "src/resources/mapStyles";

type MapConfig = {
  style: string;
  theme: "light" | "dark" | "satellite";
  zoom: number;
};

const INITIAL_MAP_CONFIG: MapConfig = {
  style: "mapbox://styles/mapbox/dark-v10",
  theme: "dark",
  zoom: 12,
};

type GeoLocation = {
  longitude: number;
  latitude: number;
};

const INITIAL_LOCATION: GeoLocation = {
  latitude: 51.509865,
  longitude: -0.118092,
};

type ContextValue = {
  map: Map | undefined;
  style: MapStyleConfig;
  setStyle: Dispatch<SetStateAction<MapStyleConfig>>;
  currentLocation: GeoLocation;
  setCurrentLocation: Dispatch<SetStateAction<GeoLocation>>;
};

const INITIAL_STATE = {
  map: undefined,
  style: MAP_STYLES[StyleName.Dark],
  setStyle: () => {},
  currentLocation: {
    latitude: 51.509865,
    longitude: -0.118092,
  },
  setCurrentLocation: () => {},
};

export const MapContext = createContext<ContextValue>(INITIAL_STATE);

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [map, setMap] = useState<Map | undefined>(INITIAL_STATE.map);
  const [style, setStyle] = useState<MapStyleConfig>(INITIAL_STATE.style); // TODO Check for user preference from OS
  const [currentLocation, setCurrentLocation] = useState<GeoLocation>(
    INITIAL_STATE.currentLocation
  );

  useEffect(() => {
    if (!map) {
      const mapbox = new mapboxgl.Map({
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "",
        container: "map",
        style: INITIAL_MAP_CONFIG.style,
        center: [INITIAL_LOCATION.longitude, INITIAL_LOCATION.latitude], // TODO Find relative coords by user IP
        zoom: INITIAL_MAP_CONFIG.zoom,
        attributionControl: false,
        localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
        logoPosition: "bottom-right",
      });

      setMap(mapbox);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.setStyle(style.url);
      if (style.theme === "dark")
        document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [map, style]);

  return (
    <MapContext.Provider
      value={{ map, style, setStyle, currentLocation, setCurrentLocation }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);

  const { map, style, setStyle, currentLocation, setCurrentLocation } = context;

  const zoomIn = () => map?.zoomIn();
  const zoomOut = () => map?.zoomOut();

  return {
    map,
    zoomIn,
    zoomOut,
    style,
    setStyle,
    currentLocation,
    setCurrentLocation,
  };
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
