import React, { useState } from "react";
import "../../src/PremiumPlan.scss";
import { planTexts } from "../../src/plans";
import { MdOutlineDone } from "react-icons/md";
import { useHistory } from "react-router-dom";
import axios from "axios";
import MyLoader from "../MyLoader";

const PremiumPlan = () => {
  const [hover, sethover] = useState(false);
  const history = useHistory();
  const [containerindex, setcontainerindex] = useState(-1);
  const [loaded, setLoading] = useState(false);
  const navigateXray = () => {
    history.push("/Scan");
  };

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

  return loaded ? (
    <div
      className="planContainer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MyLoader />
    </div>
  ) : (
    <div className="planContainer">
      <h1>Choose the right plan.</h1>
      <div style={{ height: "50px" }}></div>
      <div className="rowPlan">
        {planTexts.map((plan, index) => {
          return (
            <div
              key={index}
              className="childContainer"
              onMouseOver={() => {
                sethover(true);
                setcontainerindex(index);
              }}
              onMouseLeave={() => {
                sethover(false);
                setcontainerindex(-1);
              }}
            >
              <p>{plan.title}</p>
              <h1 style={{ fontWeight: "bold" }}>{plan.price}</h1>
              <div style={{ height: "60px" }}></div>
              {plan.features.map((feature, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      //   color: "white",
                      fontSize: "18px",
                      alignItems: "center",
                    }}
                  >
                    <MdOutlineDone />
                    <div style={{ width: "10px" }}></div>
                    <p key={index}>{feature}</p>
                  </div>
                );
              })}
              <div style={{ height: "150px" }}></div>
              <div
                onClick={() => {
                  if (index === 0) {
                    navigateXray();
                  } else {
                    navigateCheckout(plan.inr);
                  }
                }}
                style={{
                  color: hover && containerindex === index ? "black" : "white",
                  backgroundColor:
                    hover && containerindex === index ? "white" : "black",
                }}
                className="payButton"
              >
                {plan.price === "Free" ? (
                  <p>Get Started Free</p>
                ) : (
                  <p>Pay Online</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumPlan;
