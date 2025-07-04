import React, { useEffect, useRef, useContext } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import GoogleLocCards from "./googleLocCards";
import { Context } from "../../context/context.jsx";

const GoogleMapWithMarkers = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  // Context : Mainly needed to set the Latitude and Longitude for the Map... (When Changed : useEffect() do it work accordingly...)
  const { latitude, longitude, stateName } = useContext(Context);

  useEffect(() => {
    // Loading the Google Maps API...
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAP,
      version: "weekly",
      libraries: ["marker"],
    });

    loader.load().then(async () => {
      if (!mapInstanceRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude }, // Default Center is the Delhi (When the map Loads it will be in Delhi....)
          zoom: 17, // How much it is Been Zoomed in the Map by Default..
          mapId: import.meta.env.VITE_MAP_ID, // Importing the map ID for the Google Maps API (It is an Unique ID and Need the Value...)
          // Satalite View look realistic and better view....
          mapTypeId: "hybrid", // I want to set it Default to the Statelite View....
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

        // Properties of the Box :
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
        // Image of the Marker : Since we are using it to Point Some Locations.....
        const pin = document.createElement("img");
        pin.src =
          "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"; // Image of the Marker....
        // Just for the Padding of the Marker.....
        pin.style.width = "28px";
        pin.style.height = "40px";

        wrapper.appendChild(label); // Toset the Label Box at the top of Marker.....
        wrapper.appendChild(pin); // TO set the Marker ...

        // Create the marker....
        markerRef.current = new AdvancedMarkerElement({
          map,
          position: { lat: latitude, lng: longitude },
          content: wrapper,
        });
      }
    });
  }, [latitude, longitude, stateName]); // I just gave the Dependencies here just for the sake of clarity... if we do not give than also no problem....

  useEffect(() => {
    // Conitions to Chack for the Values Present or Not......
    if (
      mapInstanceRef.current &&
      markerRef.current &&
      !isNaN(latitude) &&
      !isNaN(longitude)
    ) {
      const newPosition = { lat: latitude, lng: longitude };
      //  when I clik on Card : The Value for Latitude and the Longitud Changes and the Center Value changes...
      // Since thsi useEffect() runs when the stateName, latitude, longitude changes accordingly....
      mapInstanceRef.current.setCenter(newPosition);
      markerRef.current.position = newPosition;

      if (markerRef.current.content) {
        const labelElement = markerRef.current.content.firstChild;
        if (labelElement)
          labelElement.innerText = stateName || "Updated Location";
      }
    }
  }, [latitude, longitude, stateName]); // Here the variables names are Compulsary (Since the Value have to refresh after changing the Lat and Long)

  return (
    <div
      style={{
        width: "89vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "5px", paddingBottom: "10px" }}>
        INTERACTIVE MAP LAYER <br/><p style={{paddingTop: "10px"}}>Maps to visually overlay lifestyle data like
        Central Libraries, Coaching Centers, etc : Click on Cards to Vizualise : Drage PEGMAN (YELLOW PERSON) to see Localities
        Locations</p>
      </h2>
      <div>
        <div
          ref={mapRef}
          style={{
            height: "65vh",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />
      </div>
      <div style={{ flex: 1, overflowX: "auto" }}>
        <div
          className="fav-cards"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "20px",
          }}
        >
          <GoogleLocCards />
        </div>
      </div>
    </div>
  );
};

export default GoogleMapWithMarkers;
