import "./Scan.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import imagee from "../src/assets/image.png";
import firebase from "../src/firebase";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal } from "@material-ui/core";

const Scan = () => {
  const [file, setfile] = useState();
  const [load, setload] = useState(false);
  const [response, setresponse] = useState();
  const [url, seturl] = useState("");
  const [image, setimage] = useState();
  const history = useHistory();
  const [open, setopen] = useState(false);

  function onOpen() {
    setopen(true);
  }

  function onClose() {
    setopen(false);
  }

  async function getFile(e) {
    setfile(await e.target.files[0]);
  }

  async function uploadFile() {
    console.log(file);
    if (file) {
      setload(true);
      var storageRef = firebase.storage().ref("image/" + file.name);
      await storageRef.put(file);
      await complete();
      async function complete() {
        const url = await storageRef.getDownloadURL();
        seturl(await url);
        console.log("url is " + url);
        var DataRes = await axios({
          method: "post",
          url: "http://scanet.azurewebsites.net/",
          data: {
            name: url, // This is the body part
          },
        });
        if (DataRes.data.status == "bad") {
          setload(false);
          alert("Please upload the file again");
        } else {
          setresponse(await DataRes.data);
          console.log(DataRes.data);
          setload(false);
        }
      }
    } else {
      alert("Please choose a X-Ray");
    }
  }

  const pushPage = () => {
    history.push("/Doctor");
  };

  const Dlist = [
    "Atelectasis",
    "Consolidation",
    "Infiltration",
    "Pneumothorax",
    "Edema",
    "Emphysema",
    "Fibrosis",
    "Effusion",
    "Pneumonia",
    "Pleural_Thickening",
    "Cardiomegaly",
    "Nodule",
    "Mass",
    "Hernia",
  ];

  return (
    <div className="scan container">
      <Modal
        style={{
          padding: "20px 50px",
          borderRadius: "20px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
          width: "600px",
          backgroundColor: "white",
          color: "white",
          backgroundColor: "cornflowerblue",
        }}
        className="modal"
        open={open}
        onClose={onClose}
      >
        <div className="info">
          <p>What is the correct label of the XRAY</p>
          <input
            style={{
              margin: "10px 0",
            }}
            type="text"
          />
          <div className="tnc">
            <input
              style={{
                margin: "30px 0",
                marginRight: "20px",
              }}
              type="checkbox"
            />
            <p
              style={{
                margin: "10px 0",
              }}
            >
              I agree to share the current image with scanet to retrain and
              improve their model performance.
            </p>
          </div>

          <div
            onClick={onClose}
            style={{
              cursor: "pointer",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 0",
              borderRadius: "10px",
              backgroundColor: "white",
            }}
            className="submit"
          >
            SUBMIT
          </div>
        </div>
      </Modal>
      <div className="uploadContainer">
        {image == null ? (
          <img src={imagee} alt="image" />
        ) : (
          <img
            width="200px"
            style={{ borderRadius: "10px", marginBottom: "10px" }}
            src={window.URL.createObjectURL(image)}
            alt="image"
          />
        )}

        <p>Click the button below to choose file</p>
        <label className="label">
          Choose an image
          <input
            style={{ marginTop: "5px" }}
            onChange={(e) => {
              getFile(e);
              setimage(e.target.files[0]);
            }}
            className="hiddenInput"
            type="file"
          ></input>
        </label>
      </div>
      {load ? (
        <CircularProgress className="circleProg" />
      ) : (
        <button onClick={uploadFile} style={{ width: "100%" }}>
          GET Result
        </button>
      )}
      {response != null ? (
        <div className="reading">
          <p>
            The Xray indicate signs of{" "}
            {Dlist[response.topIndex[response.topIndex.length - 1]]} with a
          </p>
          <p>
            {" "}
            chance of{" "}
            {Math.round(
              response.values[response.topIndex[response.topIndex.length - 1]] *
                100
            )}{" "}
            percent
          </p>
          <p
            style={{
              color: "cornflowerblue",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Other possibilities are{" "}
          </p>

          <div className="other">
            <p>{Dlist[response.topIndex[response.topIndex.length - 2]]}</p>
            <p>
              {Math.round(
                response.values[
                  response.topIndex[response.topIndex.length - 2]
                ] * 100
              )}{" "}
              percent
            </p>
          </div>

          <div className="other">
            <p>{Dlist[response.topIndex[response.topIndex.length - 3]]}</p>
            <p>
              {Math.round(
                response.values[
                  response.topIndex[response.topIndex.length - 3]
                ] * 100
              )}{" "}
              percent
            </p>
          </div>

          <div className="other">
            <p>{Dlist[response.topIndex[response.topIndex.length - 4]]}</p>
            <p>
              {Math.round(
                response.values[
                  response.topIndex[response.topIndex.length - 4]
                ] * 100
              )}{" "}
              percent
            </p>
          </div>

          <p style={{ margin: "20px 0" }}>
            Still In Doubt? <span onClick={pushPage}>Find Doctors Nearby</span>
          </p>
          <p style={{ marginTop: "0px" }}>
            Were we WRONG ?
            <span
              onClick={onOpen}
              style={{ color: "cornflowerblue", cursor: "pointer" }}
            >
              {" "}
              Report now.
            </span>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Scan;
