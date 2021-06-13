import React from 'react'
import mapbox from '!mapbox-gl';
import './PlaceItem.scss'


const PlaceItem = ({place, state}) => {
    const map = state.map;

    if(map) {
        const popUp = new mapbox.Popup()
        .setHTML(place.name)
        .setMaxWidth("300px")
        .addTo(map);

        const marker = new mapbox.Marker({
            color: "#2196f3",
        }).setLngLat([place.longitude, place.latitude])
        .setPopup(popUp)
        .addTo(map);
    }

    const goTo = () => {
        map.flyTo({center: [place.longitude, place.latitude], speed: 0.8})
    }

    return (
        <div className="place-item" onClick={() => goTo()}>
            {place.name}
        </div>
    )
}

export default PlaceItem
