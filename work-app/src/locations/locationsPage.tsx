import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useContext, useEffect, useMemo } from "react";
import { TitleContext } from "../context/context";

const LocationPages = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBNGqOJGUgyV8NytZGKyiHxYkX43mMQzu4",
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("Locations");
  }, [value]);

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
