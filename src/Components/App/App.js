import React, { useEffect, useState } from "react";
import Map from "../Map/Map";
import Toggler from "../Toggler/Toggler";
import Search from "../Search/Search";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./App.scss";

function App() {
  const [state, setState] = useState({
    map: null,
    latitude: 51.509865,
    longitude: -0.118092,
    style: "mapbox://styles/mapbox/dark-v10",
    theme: "dark",
    zoom: 12,
    places: [
      // {name: "Test place 1", latitude: 51.509865, longitude: -0.118092},
    ],
  });

  //Used to update App state from children components
  const updateState = (settings) => {
    setState((prevState) => {
      return { ...prevState, ...settings };
    });
  };

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
      // We execute the same script as before
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  // Set the theme on the DOM element
  useEffect(() => {
    const root = document.documentElement;

    switch (state.theme) {
      case "light":
        root.classList.add("light");
        root.classList.remove("dark");
        break;
      case "dark":
        root.classList.add("dark");
        root.classList.remove("light");
        break;
      default:
        root.classList.add("light");
        root.classList.remove("dark");
        break;
    }
  }, [state.theme]);

  return (
    <div className="App">
      <Search state={state} updateState={updateState}></Search>
      <Toggler state={state} updateState={updateState}></Toggler>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group github-container">
        <a
          href="https://github.com/atanas-dim/searching-mapbox/"
          className="github-link"
        >
          <GitHubIcon />
        </a>
      </div>

      <Map state={state} updateState={updateState}></Map>
    </div>
  );
}

export default App;
