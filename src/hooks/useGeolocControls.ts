import mapboxgl, { GeolocateControl, Map } from "mapbox-gl";
import { useEffect, useState } from "react";

export enum BtnVariant {
  Off,
  Tracking,
  ActiveCentered,
  ActiveAway,
}

const useGeolocControls = (map: Map | undefined) => {
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

    const onTrackUserStart = (): void => {
      if (btnVariant === BtnVariant.Off) setBtnVariant(BtnVariant.Tracking);
      if (btnVariant === BtnVariant.ActiveAway)
        setBtnVariant(BtnVariant.ActiveCentered);
    };

    geolocControls.on("trackuserlocationstart", onTrackUserStart);

    const onTrackUserEnd = (): void => {
      setBtnVariant(BtnVariant.ActiveAway);
    };

    geolocControls.on("trackuserlocationend", onTrackUserEnd);

    const onGeolocate = (): void => {
      setBtnVariant(BtnVariant.ActiveCentered);
    };

    geolocControls.on("geolocate", onGeolocate);

    const onError = (error: any): void => {
      console.error(error.message);
      setBtnVariant(BtnVariant.Off); // TODO This can be Error state with red colour
    };

    geolocControls.on("error", onError);

    // Remove the default geoloc control button/toggler
    document.querySelector(".mapboxgl-control-container")?.remove();

    return () => {
      geolocControls.off("trackuserlocationstart", onTrackUserStart);
      geolocControls.off("trackuserlocationend", onTrackUserEnd);
      geolocControls.off("geolocate", onGeolocate);
      geolocControls.off("error", onError);
    };
  }, [btnVariant, geolocControls]);

  const handleGeolocClick = () => {
    geolocControls?.trigger();

    if (btnVariant === BtnVariant.ActiveCentered) {
      setBtnVariant(BtnVariant.Off);
    }
  };

  return { handleGeolocClick, btnVariant };
};

export default useGeolocControls;
