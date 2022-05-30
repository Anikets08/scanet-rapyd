import React, { useState } from "react";
import "./Training.scss";
import CircularProgress from "@material-ui/core/CircularProgress";

const Training = () => {
  const [isTrue, setisTrue] = useState(false);
  const [epNumber, setepNumber] = useState(50);
  const [lrNumber, setlrNumber] = useState(0.001);
  const setTrue = () => {
    setisTrue(true);
    setTimeout(function yo() {
      setisTrue(false);
    }, 4000);
  };
  return (
    <div className="training">
      <h2>Train</h2>
      <div className="architecture">
        <p>Architecture: </p>
        <select name="archs" id="archs">
          <option value="Xception">Xception</option>
          <option value="VGG16">VGG16</option>
          <option value="ResNet50">ResNet50</option>
          <option value="MobileNet">MobileNet</option>
          <option value="EfficientNetB0">EfficientNetB0</option>
          <option value="InceptionV3">InceptionV3</option>
          <option value="DenseNet201">DenseNet201</option>
        </select>
      </div>
      <div className="Optimizer ">
        <p>Optimizer: </p>
        <select name="archs" id="archs">
          <option value="SGD">SGD</option>
          <option value="RMSprop">RMSprop</option>
          <option value="Adam">Adam</option>
          <option value="Adadelta">Adadelta</option>
          <option value="Adagrad">Adagrad</option>
          <option value="Adamax">Adamax</option>
          <option value="Nadam">Nadam</option>
        </select>
      </div>
      <div className="Epochs">
        <p>Epochs: </p>
        <input
          type="number"
          value={epNumber}
          onChange={(e) => setepNumber(e.target.value)}
        />
      </div>
      <div className="batchSize">
        <p>Batch Size: </p>
        <select name="cars" id="cars">
          <option value="16">16</option>
          <option value="32">32</option>
          <option value="64">64</option>
          <option value="128">128</option>
          <option value="256">256</option>
          <option value="512">512</option>
        </select>
      </div>
      <div className="learningRate">
        <p>Learning Rate</p>
        <input
          type="number"
          value={lrNumber}
          onChange={(e) => setlrNumber(e.target.value)}
        />
      </div>
      {isTrue ? (
        <CircularProgress />
      ) : (
        <div onClick={setTrue} className="trainModel">
          Train Model
        </div>
      )}
    </div>
  );
};

export default Training;
