import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const LocationPages = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBNGqOJGUgyV8NytZGKyiHxYkX43mMQzu4",
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  return (
    <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
        </GoogleMap>
      )}
    </div>
  );
};

export default LocationPages;
