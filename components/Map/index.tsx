import { PPMapTypes } from "components/types";
import { getCenter } from "geolib";
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkerIcon from "public/icons/marker-icon.svg";
import { FC, useState } from "react";
import ReactMapGL, { Marker } from 'react-map-gl';

const PpMap: FC<PPMapTypes> = ({ searchResults }) => {
    const coordinates = searchResults.map((result: any) => ({ // searchResult ile gelen
        latitude: result?.lat,
        longitude: result?.long
    }))
    const center = getCenter(coordinates); // searchResult ile gelen konumların merkezinin lat - long'u
    const [viewport, setViewport] = useState<unknown>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [addSelectedLocation, setAddSelectedLocation] = useState<any>(null);
    // 40.92940043002895 , 29.158856186700433

    return (
        <div id="picpathMap" className="border w-full h-screen relative">
            <ReactMapGL
                mapStyle="mapbox://styles/picpath/clf4f5c6v003f01ln5vhx9lmk"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={{
                    latitude: 41.0082376,
                    longitude: 28.9783589,
                    zoom: 9.37,
                    pitch: 100,
                }}
                minZoom={5}
                style={{ height: '100vh', width: '100%' }}
                onMove={(e) => setViewport({ ...e.viewState })}
                onDblClick={(e) => setAddSelectedLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })}
                renderWorldCopies={false}
                doubleClickZoom={false}
            /*
            maxBounds={
                [{
                    lng: 27.51101,
                    lat: 40.9781,
                },
                {
                    lng: 29.92928,
                    lat: 40.76499,
                }
                ]
                }
            */
            >
                {addSelectedLocation && (
                    <Marker
                        longitude={addSelectedLocation.latitude}
                        latitude={addSelectedLocation.longitude}
                        pitchAlignment="viewport"
                        rotationAlignment="viewport"
                        style={{ border: '1px solid red !important' }}
                    >
                        <MarkerIcon width="32px" height="32px" className="cursor-pointer animate-bounce" />

                        <div className="bg-blue-500 w-80 h-40">
                            add point example
                        </div>
                    </Marker>
                )}
                {searchResults.map((result: any) => (
                    <div key={result.lat}>
                        <Marker
                            longitude={result.lat}
                            latitude={result.long}
                            offset={[15, -15]}
                            onClick={(e) => setSelectedLocation(result)}
                            anchor="bottom"
                            pitchAlignment="viewport"
                            rotationAlignment="viewport"
                        >
                            <MarkerIcon width="32px" height="32px" className="cursor-pointer animate-bounce" />
                            {selectedLocation && selectedLocation?.title === result.title && (
                                <div className="bg-green-500 w-[250px] p-4 rounded absolute top-[-24px] left-11 z-[100]">
                                    {JSON.stringify(selectedLocation)}
                                </div>
                            )}
                        </Marker>
                    </div>
                ))}
            </ReactMapGL>
        </div>
    )
}

export default PpMap;