import React, { useEffect } from "react";
// import Toggler from "../toggler/Toggler";
// import Search from "../search/Search";
import { withMapProvider } from "src/context/MapContext";
import "./App.scss";
import Controls from "../controls/Controls";

function App() {
  // Set the theme on the DOM element
  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("dark");

    // switch (state.theme) {
    //   case "light":
    //     root.classList.add("light");
    //     root.classList.remove("dark");
    //     break;
    //   case "dark":
    //     root.classList.add("dark");
    //     root.classList.remove("light");
    //     break;
    //   default:
    //     root.classList.add("light");
    //     root.classList.remove("dark");
    //     break;
    // }
  }, []);

  return (
    <div className="app">
      {/* <Search state={state} updateState={updateState}></Search>
      <Toggler state={state} updateState={updateState}></Toggler>
      <div className="mapboxgl-ctrl mapboxgl-ctrl-group github-container">
        <a
          href="https://github.com/atanas-dim/searching-mapbox/"
          className="github-link"
        >
          GitHub
      
        </a>
      </div> */}

      <div id="map" />
      <Controls />
      {/* <ThemeToggler /> */}
      {/* <Search/> */}
    </div>
  );
}

export default withMapProvider(App);
