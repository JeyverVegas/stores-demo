import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useEffect, useState } from "react";

const MapContainer = ({ google, style, markers, onClick, zoom, center }) => {

  const [currentCenter, setCurrentCenter] = useState({ lat: 10.480514845676074, lng: -66.89587398031026 });

  useEffect(() => {
    if (markers?.length > 0) {
      setCurrentCenter({
        lat: markers?.[0]?.latitude,
        lng: markers?.[0]?.longitude,
      });
    }
  }, [markers])

  useEffect(() => {
    if (center) {
      setCurrentCenter(center);
    }
  }, [center])

  return (
    <Map
      google={google}
      zoom={zoom ? zoom : 12}
      containerStyle={{
        position: 'relative',
        height: 200,
        ...style
      }}
      onClick={(mapPros, map, e) => { onClick?.(e) }}
      center={currentCenter}
    >
      {markers?.map((marker, i) => <Marker
        key={i}
        title={marker.title}
        position={{
          lat: marker?.latitude,
          lng: marker?.longitude,
        }}
        onClick={(e) => marker?.onClick(marker, e)}
      />)}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);