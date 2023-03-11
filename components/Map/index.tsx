import { PPMapTypes } from "components/types";
import { getCenter } from "geolib";
import { FC, useState } from "react";
import MapGl, { Marker } from 'react-map-gl';

const PpMap: FC<PPMapTypes> = ({ searchResults }) => {
    const coordinates = searchResults.map(result => ({ // searchResult ile gelen
        latitude: result.lat,
        longitude: result.long
    }))
    const center = getCenter(coordinates); // searchResult ile gelen konumların merkezinin lat - long'u

    const [viewport, setViewport] = useState({ // initial viewport İstanbul
        bearing: 0,
        //latitude: center?.latitude || 41.0,
        //longitude: center?.longitude || 28.9,
        pitch: 0,
    });

    console.log('eren coordinates -->', center);

    return (
        <div id="picpathMap" className="border w-full h-[95%] overflow-hidden">
            <MapGl
                initialViewState={{// initial viewport İstanbul
                    latitude: 41.0,
                    longitude: 28.9,
                    zoom: 10,
                }}
                mapStyle="mapbox://styles/picpath/clf4f5c6v003f01ln5vhx9lmk"
                style={{ height: 780, width: '100%' }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                onMove={(e) => setViewport({ ...e.viewState })}
                minZoom={1.9321973857206018}
                {...viewport}
            >
                {searchResults.map(result => (
                    <div key={result.lat} className="bg-pp-secondary-green">
                        <Marker longitude={result.lat} latitude={result.long} color="red">🎯</Marker>
                    </div>
                ))}
            </MapGl>
        </div>
    )
}

export default PpMap;