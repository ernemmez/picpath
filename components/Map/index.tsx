import { PPMapTypes } from "components/types";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css";
import { FC, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import styled from "./map.module.css";
import { UserAvatarMarker } from "./markers/UserAvatarMarker";
import { ResultCard } from "./ResultCard";

const PpMap: FC<PPMapTypes> = ({ resultData }) => {
  const coordinates = resultData.map((result: any) => ({
    // searchResult ile gelen
    latitude: result?.lat,
    longitude: result?.long,
  }));
  const center = getCenter(coordinates); // searchResult ile gelen konumların merkezinin lat - long'u
  const [viewport, setViewport] = useState<any>({
    latitude: 41.0082376,
    longitude: 28.9783589,
    zoom: 9.37,
    pitch: 100,
    fitBounds: true,
  });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [addSelectedLocation, setAddSelectedLocation] = useState<any>(null);
  // 40.92940043002895 , 29.158856186700433

  /**
  const [myLocation, setMylocation] = useState<any>(null);
  const whereIAm = () => {
    navigator.geolocation.getCurrentPosition(success, reject);
  };
  const success = (e: any) => {
    setMylocation({
      latitude: e.coords.latitude,
      longitude: e.coords.longitude,
    });
  };
  console.log("myLocation", myLocation?.latitude, myLocation?.longitude);
  const reject = (error: any) => {
    console.log(error);
  };
**/

  const newPoint = (e: any) => {
    setAddSelectedLocation({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });
  };

  const ConfirmAddMarker = () => {
    console.log(
      `Onaylandı, son konum -> Latitute ${addSelectedLocation.latitude} - longitude ${addSelectedLocation.longitude}`
    );
  };

  console.log("ads", addSelectedLocation);

  return (
    <div id="picpathMap" className="w-full h-screen">
      <ReactMapGL
        initialViewState={viewport}
        mapStyle="mapbox://styles/picpath/clf4f5c6v003f01ln5vhx9lmk"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        minZoom={3}
        onDblClick={(e) =>
          setAddSelectedLocation({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng,
          })
        }
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
        {resultData.map((result: any) => (
          <div key={result.lat}>
            <Marker
              latitude={result.lat}
              longitude={result.long}
              rotationAlignment="viewport"
              pitchAlignment="viewport"
              aria-label="push-pin"
              onClick={() => setSelectedLocation(result)}
              style={{ zIndex: "102" }}
            >
              <UserAvatarMarker userPhotoUrl={result.userPhotoUrl} />
              {selectedLocation?.long === result?.long && (
                <ResultCard data={selectedLocation} />
              )}
            </Marker>
          </div>
        ))}
        <NavigationControl position="bottom-right" />
        {addSelectedLocation && (
          <>
            <button onClick={ConfirmAddMarker} className={styled.ConfirmButton}>
              Onayla
            </button>
            <Marker
              latitude={addSelectedLocation?.latitude}
              longitude={addSelectedLocation?.longitude}
              draggable
              onDragEnd={(e) => newPoint(e)} // State'e Yazılacak son konum
            ></Marker>
          </>
        )}

        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
        ></GeolocateControl>
      </ReactMapGL>
    </div>
  );
};

export default PpMap;
