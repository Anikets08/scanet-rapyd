import "./Footer.scss";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img src={logo} style={{ width: "100px", margin: "0 10px" }} />
      <p className="footerfont">2021 All rights reserved</p>
    </div>
  );
};

export default Footer;
