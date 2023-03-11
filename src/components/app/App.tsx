import React from "react";
import ThemePicker from "../themePicker/ThemePicker";
// import Search from "../search/Search";
import { withMapProvider } from "src/context/MapContext";
import Controls from "../controls/Controls";
import "./App.scss";

function App() {
  return (
    <>
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
      <ThemePicker />
      {/* <Search/> */}
    </>
  );
}

export default withMapProvider(App);
