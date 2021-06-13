import React, { useEffect }  from 'react';
import mapbox from '!mapbox-gl';
import './Map.scss';

const Map = ({state, updateState}) => {

    let map = "";

    useEffect(() => {
        mapbox.accessToken = "pk.eyJ1IjoiYXRhbmFzZGltIiwiYSI6ImNrcHI5OWwxNTAyOGkycXBzY3poenZzbmIifQ.89P2_0OkKWuRAd93Od68KQ";

        // Creates a map instance
        const map = new mapbox.Map({
            container: "map",
            style: state.style,
            center: [state.longitude, state.latitude],
            zoom: state.zoom,
        });

        // Adds user tracker
        const userLocation = new mapbox.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        map.addControl(userLocation, "top-right");

        // Adds navigation controls
        const navigation = new mapbox.NavigationControl();
        map.addControl(navigation, "top-right");


        updateState("map", map);

    }, []);
    
    useEffect(() => {
        if (state.map) {
            state.map.setStyle(state.style);
        }   
    }, [state.style])

    return (
        <div id="map">
            
        </div>
    )
}

export default Map;
