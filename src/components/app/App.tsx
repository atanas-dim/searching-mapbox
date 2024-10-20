import React from "react";

import { withMapProvider } from "src/context/MapContext";

import ThemePicker from "src/components/themePicker/ThemePicker";
import Search from "src/components/search/Search";
import Controls from "src/components/controls/Controls";

import "./App.scss";

function App() {
  return (
    <>
      <div id="map" />
      <Controls />
      <ThemePicker />
      <Search />
    </>
  );
}

export default withMapProvider(App);
