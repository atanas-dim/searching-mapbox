import React from 'react';
import './Toggler.scss';

const Toggler = ({state, updateState}) => {

    const styles = [
        {
            name: "Satellite",
            url: "mapbox://styles/mapbox/satellite-streets-v11"
        },
        {
            name: "Light",
            url: "mapbox://styles/mapbox/light-v10"
        },
        {
            name: "Dark",
            url: "mapbox://styles/mapbox/dark-v10"
        }
    ]

    const buttons = styles.map((style, index) => {

        let className = "";

        if (style.url === state.style) {
            className = "selected"
        }

        return <button onClick={() => {updateState( "style", style.url)}} key={`styleBtn${index}`} className={className} >{style.name}</button>
    })

    return (
        <div className="toggler">
            {buttons}
        </div>
    )
}

export default Toggler
