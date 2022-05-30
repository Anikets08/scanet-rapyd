import React, { useState } from "react";
import "./Preview.scss";
import image from "../../assets/image.png";
const Preview = () => {
  const [fileImage, setfileImage] = useState();
  return (
    <div className="preview">
      <h2>Preview</h2>
      <label className="previewLabel">
        Choose a Testing image
        <input
          onChange={(e) => setfileImage(e.target.files[0])}
          className="previewinput"
          type="file"
        />
      </label>
      {fileImage == null ? (
        <img src={image} />
      ) : (
        <img
          style={{ width: "200px", borderRadius: "20px" }}
          src={URL.createObjectURL(fileImage)}
        />
      )}
      {fileImage == null ? (
        ""
      ) : (
        <div className="output">
          <div className="c1">
            <p>Covid</p>
            <div className="perDiv  perDiv1"></div>
          </div>
          <div className="c2">
            <p>Normal</p>
            <div className="perDiv perDiv2">86%</div>
          </div>
        </div>
      )}

      <div className="export">EXPORT</div>
    </div>
  );
};

export default Preview;
