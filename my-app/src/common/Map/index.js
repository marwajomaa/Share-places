import React from "react";
import { Map, Marker } from "yandex-map-react";

const Maps = ({ lat, lon }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        center={[lat, lon]}
        zoom={10}
        width={400}
        height={300}
        loadOptions={{ lang: "en_US" }}
      >
        <Marker lat={lat} lon={lon} />
      </Map>
    </div>
  );
};
export default Maps;
