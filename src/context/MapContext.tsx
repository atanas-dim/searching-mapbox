import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  MutableRefObject,
} from "react";

type ContextValue = {
  map: MutableRefObject<any>;
};

const INITIAL_STATE = {
  map: { current: null },
};

export const MapContext = createContext<ContextValue>(INITIAL_STATE);

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const map = useRef(null);

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

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
