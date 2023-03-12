import { PPMapTypes } from "components/types";
import { getCenter } from "geolib";
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkerIcon from "public/icons/marker-icon.svg";
import { FC, useState } from "react";
import MapGl, { Marker } from 'react-map-gl';

const PpMap: FC<PPMapTypes> = ({ searchResults }) => {
    const coordinates = searchResults.map((result: any) => ({ // searchResult ile gelen
        latitude: result?.lat,
        longitude: result?.long
    }))
    const center = getCenter(coordinates); // searchResult ile gelen konumların merkezinin lat - long'u
    const [viewport, setViewport] = useState({ // initial viewport İstanbul
        bearing: 0,
        //latitude: center.latitude || 41.0,
        //longitude: center.longitude || 28.9,
        pitch: 0,
    });
    const [selectedLocation, setSelectedLocation] = useState<any>(null);

    //console.log('eren coordinates -->', center);

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
                {searchResults.map((result: any) => (
                    <div key={result.lat} className="relative">
                        <Marker longitude={result.lat} latitude={result.long} color="red" onClick={(e) => setSelectedLocation(result)}>
                            {selectedLocation && selectedLocation?.title === result.title && (
                                <div className="bg-green-500 w-[250px] p-4 rounded absolute top-[-24px] left-11 z-[100]">
                                    {JSON.stringify(selectedLocation)}
                                </div>
                            )}
                            <MarkerIcon width="32px" height="32px" className="cursor-pointer animate-bounce" />
                        </Marker>
                    </div>
                ))}
            </MapGl>
        </div>
    )
}

export default PpMap;