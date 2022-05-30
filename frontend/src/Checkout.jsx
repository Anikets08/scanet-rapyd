import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState("");
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <iframe
        height={"100%"}
        width={"100%"}
        srcDoc={`
    <!DOCTYPE html>
<html>

<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapyd Checkout Toolkit</title>
    <script src="https://sandboxcheckouttoolkit.rapyd.net"></script>
    <script>
        window.onload = function () {
            let checkout = new RapydCheckoutToolkit({
                pay_button_text: "Click to pay",
                pay_button_color: "blue",
                id: ${`"${location.state.cid}"`},
            });
            checkout.displayCheckout();
        }
        window.addEventListener('onCheckoutPaymentSuccess', function (event) {
            // window.close();
            // window.location.replace("http://localhost:3001/");
            
            window.history.back();
            window.history.back();
            window.open("https://firebasestorage.googleapis.com/v0/b/sythesizeai.appspot.com/o/success.html?alt=media&token=675aaa7a-5e24-403c-b900-f4784fffcd42");

           
        });
        window.addEventListener('onCheckoutFailure', function (event) {
            window.history.back();
            window.history.back();
            window.open("https://firebasestorage.googleapis.com/v0/b/sythesizeai.appspot.com/o/failed.html?alt=media&token=316f5f66-1327-46ff-9a61-50584fcd7957");
        });
    </script>
</head>

<body style="background-color: #ffffff; display: flex; align-items: center; flex-direction: column; margin: 0"> 
    <div style="width: 500px" id="rapyd-checkout"></div>
</body>

</html>
    
    `}
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default Checkout;
