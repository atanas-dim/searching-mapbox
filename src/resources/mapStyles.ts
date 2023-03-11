export enum StyleName {
  Satellite,
  Light,
  Dark,
}

export type MapStyleConfig = {
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
