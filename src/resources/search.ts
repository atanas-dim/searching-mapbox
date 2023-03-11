import { GeoLocation } from "src/context/MapContext";

export const findNearbyPlaces = async (
  searchTerm: string,
  currentLocation: GeoLocation
) => {
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const proximity = `${currentLocation.longitude},${currentLocation.latitude}`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?limit=10&proximity=${proximity}&access_token=${accessToken}`;

  return await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  });
};
