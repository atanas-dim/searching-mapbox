import mapboxgl, { GeolocateControl, Map } from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";

type GeolocState = {
  isTrackingUserLoc: boolean;
  geolocIsActive: boolean;
  isAtUserLoc: boolean;
};
const INITIAL_STATE = {
  isTrackingUserLoc: false,
  geolocIsActive: false,
  isAtUserLoc: false,
};

export enum BtnVariant {
  Off,
  Tracking,
  ActiveCentered,
  ActiveAway,
}

const useGeolocControls = (map: Map | undefined) => {
  const [geolocControls, setGeolocControls] = useState<GeolocateControl>();
  const [state, setState] = useState<GeolocState>(INITIAL_STATE);

  const updateState = useCallback((state: Partial<GeolocState>) => {
    setState((prevState) => {
      return { ...prevState, ...state };
    });
  }, []);

  const [btnVariant, setBtnVariant] = useState(BtnVariant.Off);

  const isActive =
    btnVariant === BtnVariant.ActiveAway ||
    btnVariant === BtnVariant.ActiveCentered;

  useEffect(() => {
    if (!map) return;
    if (!geolocControls) {
      const controls = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      map.addControl(controls);
      setGeolocControls(controls);
    }
  }, [geolocControls, map]);

  useEffect(() => {
    if (!geolocControls) return;

    const onTrackUserStart = (): void => {
      console.log("HERE 0", btnVariant);

      if (btnVariant === BtnVariant.Off) setBtnVariant(BtnVariant.Tracking);
      if (btnVariant === BtnVariant.ActiveAway)
        setBtnVariant(BtnVariant.ActiveCentered);

      updateState({ isTrackingUserLoc: true, isAtUserLoc: false });
    };

    geolocControls.on("trackuserlocationstart", onTrackUserStart);

    const onTrackUserEnd = (event: any): void => {
      console.log("HERE 1");

      setBtnVariant(BtnVariant.ActiveAway);

      updateState({
        isTrackingUserLoc: false,
        geolocIsActive: true,
        isAtUserLoc: false,
      });
    };

    geolocControls.on("trackuserlocationend", onTrackUserEnd);

    const onGeolocate = (event: any): void => {
      console.log("HERE 2");

      setBtnVariant(BtnVariant.ActiveCentered);

      updateState({
        isTrackingUserLoc: false,
        geolocIsActive: true,
        isAtUserLoc: true,
      });
    };

    geolocControls.on("geolocate", onGeolocate);

    const onError = (): void => {
      console.log("HERE 3");

      setBtnVariant(BtnVariant.Off);

      updateState({
        isTrackingUserLoc: false,
        geolocIsActive: false,
        isAtUserLoc: false,
      });
    };

    geolocControls.on("error", onError);

    // Remove the default geoloc control button/toggler
    document.querySelector(".mapboxgl-control-container")?.remove();

    return () => {
      //here clear listeners
      console.log("CLEAR LISTENERS");
      geolocControls.off("trackuserlocationstart", onTrackUserStart);
      geolocControls.off("trackuserlocationend", onTrackUserEnd);
      geolocControls.off("geolocate", onGeolocate);
      geolocControls.off("error", onError);
    };
  }, [btnVariant, geolocControls, updateState]);

  const handleGeolocClick = () => {
    geolocControls?.trigger();

    if (btnVariant === BtnVariant.ActiveCentered) {
      console.log("SETTING OFF");
      setBtnVariant(BtnVariant.Off);
      updateState({ geolocIsActive: false });
    }
  };

  console.log({ btnVariant });

  return { handleGeolocClick, btnVariant, ...state };
};

export default useGeolocControls;
