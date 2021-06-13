import React, { useState, useEffect, useCallback } from 'react';
import Map from '../Map/Map';
import Toggler from '../Toggler/Toggler'
import Search from '../Search/Search'
import PlacesPanel from '../PlacePanel/PlacesPanel';
import './App.scss';

function App() {

  const [state, setState] = useState({
    map: null,
    latitude: 51.509865,
    longitude: -0.118092,
    style: "mapbox://styles/mapbox/dark-v10",
    zoom: 12,
    places: [
      // {name: "Test place 1", latitude: 51.509865, longitude: -0.118092},
      // {name: "Test place 2", latitude: 51.509865, longitude: -0.118092}
    ]
  })

  const updateState = (property, value) => {
    // console.log(state);
    setState(prevState => {
      return {...prevState, [property]: value}
    })
  }

  return (
    <div className="App">
      {/* <PlacesPanel state={state}></PlacesPanel> */}
      <Search state={state} updateState={updateState} ></Search>
      <Toggler state={state} updateState={updateState} ></Toggler>
      <Map state={state} updateState={updateState}></Map>
    </div>
  );
}

export default App;
