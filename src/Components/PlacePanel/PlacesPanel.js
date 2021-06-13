import React from 'react'
import PlaceItem from '../PlaceItem/PlaceItem'
import './PlacesPanel.scss'

const PlacesPanel = ({state, searchState}) => {

    const places = state.places;

    let placeItems = <div className="no-results">Nothing added yet</div>

    if (places.length > 0) {
        placeItems = places.map((place, index) => {
        return <PlaceItem place={place} state={state} key={`place${index}`}></PlaceItem>
    })
    }

    if (searchState.isLoading) {
        return (
            <div className="places">
                <div className="loading-message" >Loading...</div>
            </div>
        )
    }

    if (searchState.error) {
        return (
            <div className="places">
                <div className="error-message" >Search failed. Try again</div>
            </div>
        )
    }

    return (
        <div className="places">
            {placeItems}
        </div>
    )
}

export default PlacesPanel
