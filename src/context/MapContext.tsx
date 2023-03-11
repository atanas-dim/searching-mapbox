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

// TODO Move to resources
export enum StyleName {
  Satellite,
  Light,
  Dark,
}

type MapStyleConfig = {
  name: string;
  url: string;
  theme: "light" | "dark";
};
export const MAP_STYLES: { [key in StyleName]: MapStyleConfig } = {
  [StyleName.Satellite]: {
    name: "Satellite",
    url: "mapbox://styles/mapbox/satellite-streets-v11",
    theme: "light",
  },
  [StyleName.Light]: {
    name: "Light",
    url: "mapbox://styles/mapbox/light-v10",
    theme: "light",
  },
  [StyleName.Dark]: {
    name: "Dark",
    url: "mapbox://styles/mapbox/dark-v10",
    theme: "dark",
  },
};

type ContextValue = {
  map: Map | undefined;
  style: MapStyleConfig;
  setStyle: Dispatch<SetStateAction<MapStyleConfig>>;
};

const INITIAL_STATE = {
  map: undefined,
  style: MAP_STYLES[StyleName.Dark],
  setStyle: () => {},
};

export const MapContext = createContext<ContextValue>(INITIAL_STATE);

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [map, setMap] = useState<Map | undefined>(INITIAL_STATE.map);
  const [style, setStyle] = useState<MapStyleConfig>(INITIAL_STATE.style); // TODO Check for user preference from OS

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

  useEffect(() => {
    if (map) {
      map.setStyle(style.url);
      if (style.theme === "dark")
        document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  }, [map, style]);

  return (
    <MapContext.Provider value={{ map, style, setStyle }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);

  const { map, style, setStyle } = context;

  const zoomIn = () => map?.zoomIn();
  const zoomOut = () => map?.zoomOut();

  return { map, zoomIn, zoomOut, style, setStyle };
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
