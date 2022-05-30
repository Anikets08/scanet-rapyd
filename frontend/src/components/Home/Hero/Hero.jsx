import React from "react";
import "./Hero.scss";
import image from "../../../assets/illu.png";
import { useHistory } from "react-router-dom";

const Hero = () => {
  const history = useHistory();
  function handleClick() {
    history.push("/Scan");
  }

  return (
    <div className="hero container">
      <div className="content">
        <p className="herotext">
          Welcome to <span>Scanet</span> the next gen AI way to read your
          X-Rays, create your own models and find doctors nearby <span>.</span>
        </p>
        <div className="spacer"></div>
        <button onClick={handleClick}>Read X-Ray</button>
      </div>
      <div className="image">
        <img className="illustation" src={image} alt="illustration" />
      </div>
    </div>
  );
};

export default Hero;
