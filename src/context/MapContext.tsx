import React, {
  useEffect,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
  useCallback,
  MutableRefObject,
} from "react";

import mapbox, { Control, GeolocateControl, Map } from "mapbox-gl";

type ContextValue = {
  mapRef: MutableRefObject<Map | undefined>;
  geolocControlRef: MutableRefObject<GeolocateControl | undefined>;
};

const INITIAL_STATE = {
  mapRef: { current: undefined },
  geolocControlRef: { current: undefined },
};

type MapConfig = {
  latitude: number;
  longitude: number;
  style: string;
  theme: "light" | "dark" | "satellite";
  zoom: number;
  // places: [// {name: "Test place 1", latitude: 51.509865, longitude: -0.118092},];
};

const MAP_CONFIG: MapConfig = {
  latitude: 51.509865,
  longitude: -0.118092,
  style: "mapbox://styles/mapbox/dark-v10",
  theme: "dark",
  zoom: 12,
  // places: [
  //   // {name: "Test place 1", latitude: 51.509865, longitude: -0.118092},
  // ],
};
export const MapContext = createContext<ContextValue>(INITIAL_STATE);

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const mapRef = useRef<Map>();
  const geolocControlRef = useRef<GeolocateControl>();

  const [state, setState] = useState<MapConfig>(MAP_CONFIG);

  const updateState = useCallback((state: Partial<MapConfig>) => {
    setState((prevState) => {
      return { ...prevState, ...state };
    });
  }, []);

  useEffect(() => {
    if (mapRef.current) return;

    // Creates a map instance
    mapRef.current = new mapbox.Map({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "",
      container: "map",
      style: state.style,
      center: [state.longitude, state.latitude],
      zoom: state.zoom,
      attributionControl: false,
      localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif",
      logoPosition: "bottom-right",
    });

    // Adds user tracker
    geolocControlRef.current = new mapbox.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    mapRef.current.addControl(geolocControlRef.current);

    geolocControlRef.current.on("trackuserlocationend", (event: any): void => {
      console.log("HERE 1");
      const longitude = event?.target._accuracyCircleMarker._lngLat.lng;
      const latitude = event?.target._accuracyCircleMarker._lngLat.lat;

      updateState({ longitude, latitude });
    });

    geolocControlRef.current.on("geolocate", (event: any): void => {
      console.log("HERE 2");
      const longitude = event?.target._accuracyCircleMarker._lngLat.lng;
      const latitude = event?.target._accuracyCircleMarker._lngLat.lat;

      updateState({ longitude, latitude });
    });

    // Remove the default geoloc control button/toggler
    document.querySelector(".mapboxgl-control-container")?.remove();
  }, [
    mapRef,
    state.latitude,
    state.longitude,
    state.style,
    state.zoom,
    updateState,
  ]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(state.style);
    }
  }, [state.style]);

  return (
    <MapContext.Provider value={{ mapRef, geolocControlRef }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);

  const { mapRef, geolocControlRef } = context;

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();
  const findUserLocation = () => geolocControlRef.current?.trigger();

  return { ...context, zoomIn, zoomOut, findUserLocation };
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
