import React, { useEffect, useState } from "react";
import Map from "../Map/Map";
import Toggler from "../Toggler/Toggler";
import Search from "../Search/Search";
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
    // console.log(state);
  };

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
    }
  }, [state.theme]);

  return (
    <div className="App">
      <Search state={state} updateState={updateState}></Search>
      <Toggler state={state} updateState={updateState}></Toggler>
      <Map state={state} updateState={updateState}></Map>
    </div>
  );
}

export default App;
