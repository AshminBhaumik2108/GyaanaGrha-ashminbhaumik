import React, { useEffect, useRef, useContext } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import GoogleLocCards from "./googleLocCards";
import { Context } from "../../context/context.jsx";

const GoogleMapWithMarkers = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const { latitude, longitude, stateName } = useContext(Context);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAP,
      version: "weekly",
      libraries: ["marker"],
    });

    loader.load().then(async () => {
      if (!mapInstanceRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 18,
          mapId: import.meta.env.VITE_MAP_ID,
        });
        mapInstanceRef.current = map;

        const [{ AdvancedMarkerElement }] = await Promise.all([
          window.google.maps.importLibrary("marker"),
        ]);

        // Create the label div
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";

        const label = document.createElement("div");
        label.innerText = stateName || "Default Location : Delhi";
        label.style.padding = "6px 10px";
        label.style.background = "#000";
        label.style.color = "#fff";
        label.style.borderRadius = "5px";
        label.style.fontSize = "13px";
        label.style.marginBottom = "6px";
        label.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        label.style.whiteSpace = "nowrap";

        const pin = document.createElement("img");
        pin.src =
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"; // Image of the Marker....
        // Just for the Padding of the Marker.....
          pin.style.width = "28px";
        pin.style.height = "40px";

        wrapper.appendChild(label);
        wrapper.appendChild(pin);

        markerRef.current = new AdvancedMarkerElement({
          map,
          position: { lat: latitude, lng: longitude },
          content: wrapper,
        });
      }
    });
  }, [latitude, longitude, stateName]); // I just gave the Dependencies here just for the sake of clarity... if we do not give than also no problem....

  useEffect(() => {
    if (
      mapInstanceRef.current &&
      markerRef.current &&
      !isNaN(latitude) &&
      !isNaN(longitude)
    ) {
      const newPosition = { lat: latitude, lng: longitude };
      mapInstanceRef.current.setCenter(newPosition);
      markerRef.current.position = newPosition;

      if (markerRef.current.content) {
        const labelElement = markerRef.current.content.firstChild;
        if (labelElement) labelElement.innerText = stateName || "Updated Location";
      }
    }
  }, [latitude, longitude, stateName]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "20px", paddingRight: "300px" }}>
        Google Maps: (Google Maps to visually overlay lifestyle data like
        Central Libraries, Coaching Centers, etc.)
      </h1>

      <div
        ref={mapRef}
        style={{
          height: "60vh",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "40px",
        }}
      />
      <div
        className="fav-cards"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <GoogleLocCards />
      </div>
    </div>
  );
};

export default GoogleMapWithMarkers;
