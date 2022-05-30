import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Checkout from "./Checkout";

import Footer from "./components/Footer/Footer";
import Hero from "./components/Home/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import PremiumPlan from "./components/PremiumPlan";
import Doctor from "./Doctor";
import "./Home.scss";
import Model from "./Model";
import Scan from "./Scan";

const Home = () => {
  return (
    // <Router>
    <div className="home">
      <Navbar />
      <Route exact={true} path="/" component={Hero} />
      <Route path="/Scan" component={Scan} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/Doctor" component={Doctor} />
      <Route path="/Model" component={Model} />
      <Route path="/Plan" component={PremiumPlan} />
      <Footer />
    </div>
  );
};

export default Home;
