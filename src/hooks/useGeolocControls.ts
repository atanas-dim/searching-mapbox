import mapboxgl, { GeolocateControl, Map } from "mapbox-gl";
import { useContext, useEffect, useState } from "react";
import { MapContext } from "src/context/MapContext";

export enum BtnVariant {
  Off,
  Tracking,
  ActiveCentered,
  ActiveAway,
}

const useGeolocControls = (map: Map | undefined) => {
  const { setCurrentLocation } = useContext(MapContext);
  const [geolocControls, setGeolocControls] = useState<GeolocateControl>();

  const [btnVariant, setBtnVariant] = useState(BtnVariant.Off);

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

    const onTrackUserStart = (event: any): void => {
      if (btnVariant === BtnVariant.Off) setBtnVariant(BtnVariant.Tracking);
      if (btnVariant === BtnVariant.ActiveAway)
        setBtnVariant(BtnVariant.ActiveCentered);
    };

    geolocControls.on("trackuserlocationstart", onTrackUserStart);

    const onTrackUserEnd = (event: any): void => {
      setBtnVariant(BtnVariant.ActiveAway);
    };

    geolocControls.on("trackuserlocationend", onTrackUserEnd);

    const onGeolocate = (event: any): void => {
      const { latitude, longitude } = event.coords || {};
      setCurrentLocation({ longitude: longitude, latitude: latitude });
      setBtnVariant(BtnVariant.ActiveCentered);
    };

    geolocControls.on("geolocate", onGeolocate);

    const onError = (error: any): void => {
      console.error(error.message);
      setBtnVariant(BtnVariant.Off); // TODO This can be Error state with red colour
    };

    geolocControls.on("error", onError);

    // Remove the default controls containers
    document.querySelector(".mapboxgl-ctrl-top-right")?.remove();
    document.querySelector(".mapboxgl-ctrl-top-left")?.remove();
    document.querySelector(".mapboxgl-ctrl-bottom-left")?.remove();

    return () => {
      geolocControls.off("trackuserlocationstart", onTrackUserStart);
      geolocControls.off("trackuserlocationend", onTrackUserEnd);
      geolocControls.off("geolocate", onGeolocate);
      geolocControls.off("error", onError);
    };
  }, [btnVariant, geolocControls, setCurrentLocation]);

  const handleGeolocClick = () => {
    geolocControls?.trigger();

    if (btnVariant === BtnVariant.ActiveCentered) {
      setBtnVariant(BtnVariant.Off);
    }
  };

  return { handleGeolocClick, btnVariant };
};

export default useGeolocControls;
