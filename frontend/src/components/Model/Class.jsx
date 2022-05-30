import React, { useState } from "react";
import "./Class.scss";
const Class = () => {
  const [image, setimage] = useState([]);
  const fileHandler = (e) => {
    setimage(e.target.files);
  };
  // function click() {
  //   console.log(image.length);
  // }
  return (
    <div Class="classs">
      <div className="row1">
        <div contentEditable="true" className="className">
          Class Name
        </div>
      </div>
      <div className="divider"></div>
      <div className="row2">
        <div className="col1">
          <p>Add Image Samples: {image ? image.length + " selected" : ""} </p>
          <div className="buttonsRow">
            <label>
              Choose Images
              <input
                onChange={fileHandler}
                className="noneInput"
                multiple="true"
                type="file"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;
