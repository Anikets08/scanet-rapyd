import "./Footer.scss";
import logo from "../../assets/logo.png";

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <img src={logo} style={{ width: "100px", margin: "0 10px" }} />
      <p className="footerfont">{currentYear} All rights reserved</p>
    </div>
  );
};

export default Footer;
