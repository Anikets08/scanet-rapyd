import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import * as parkDate from "./skateboard-parks.json";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "./Doctor.scss";
import doctorImage from "./assets/doctor.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MyLoader from "./MyLoader";

export default function Doctor() {
  const [loaded, setLoading] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 21.11094750780796,
    longitude: 79.06984464603627,
    width: "70vw",
    height: "75vh",
    zoom: 12.6,
  });
  const [selectedPark, setSelectedPark] = useState(null);

  const goToNYC = (long, lati) => {
    setViewport({
      ...viewport,
      longitude: long,
      latitude: lati,
      zoom: 15,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };
  const history = useHistory();
  const navigateCheckout = (amount) => {
    setLoading(true);
    axios
      .post("https://scanet-backend-web.herokuapp.com/checkout", {
        amount: amount,
      })
      .then((res) => {
        setLoading(false);
        history.push({
          pathname: "/checkout",
          state: {
            cid: res.data.body["data"]["id"],
          },
        });
      });
  };

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return loaded ? (
    <div className="doctor">
      <MyLoader />
    </div>
  ) : (
    <div className="doctor">
      <div className="menuContainer">
        {parkDate.features.map((hosp) => (
          <div
            onClick={() => {
              goToNYC(
                hosp.geometry.coordinates[0],
                hosp.geometry.coordinates[1]
              );
            }}
            key={hosp.properties.NAME}
            className="hospitalContainer"
          >
            <p className="mainText">{hosp.properties.NAME}</p>
            <p>{hosp.properties.DESCRIPTIO}</p>
            <div
              onClick={() => {
                navigateCheckout("250");
                console.log("tess");
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                color: "black",
                marginTop: "3px",
                padding: "5px",
                borderRadius: "10px",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <p>Book Appointment</p>
            </div>
          </div>
        ))}
      </div>
      <ReactMapGL
        className="mapMap"
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiYW5pa2V0czA4IiwiYSI6ImNrc29hY2NtdDAyd3AydXM2dnp5MGlsYWYifQ.qA7LrPKGWxDjbDs0-YXT_A"
        // mapStyle="mapbox://styles/anikets08/ckskdoxfk0sfz17qdg35s5usl"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {parkDate.features.map((park) => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <div
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedPark(park);
              }}
            >
              <img src={doctorImage} width="70px" />
            </div>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.geometry.coordinates[1]}
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <div style={{ height: "10px" }}></div>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
              <div style={{ height: "10px" }}></div>
            </div>
          </Popup>
        ) : null}
        {/* <button onClick={goToNYC}>Click</button> */}
      </ReactMapGL>
    </div>
  );
}
