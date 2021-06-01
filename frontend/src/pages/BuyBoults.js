import React, { useState } from "react";
import "./BuyBoults.css";
import boost from "./images/boost.png";
import ellipse from "./images/ellipse.png";
import BuyBoultsCard from "./components/BuyBoultsCard";
import { useQuery } from "@apollo/react-hooks";
import { findallflashes } from "../graphql/gql";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

function BuyBoults({ flashes, history }) {
  const { data: allflashesData, loading: allflashesloading } = useQuery(
    findallflashes
  );

  const [name, setName] = useState("Mehul");

  function paymentPage() {
    history.push("/paymentbolts");
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:4000/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_qxgjA4eVe6j5UJ" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      image: "http://localhost:4000/logo.svg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name,
        email: "sdfdsjfh2@ndsfdf.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  let renderListing2 = [];
  if (allflashesData) {
    let temp2 = [];
    for (let i = 0; i < allflashesData.findallflashes.length; i++) {
      if (i % 3 === 0 && i > 0) {
        renderListing2.push(temp2);
        temp2 = [];
      }
      temp2.push(allflashesData.findallflashes[i]);
    }
    if (temp2.length !== 0) {
      renderListing2.push(temp2);
      temp2 = [];
    }
  }
  return (
    <div className="buybolts-parent-container">
      <div className="buybolts-main-title-container">
        <h2 className="buybolts-main-title-text1"> Buy </h2>
        <h2 className="buybolts-main-title-text2"> Bolts </h2>
      </div>
      <div className="buybolts-header-container">
        <div>
          <div className="buybolts-header-wrapper">
            <h1 className="buybolts-header-text"> {flashes}</h1>
            <div
              className="buybolts-header-image"
              style={{ backgroundImage: `url(${boost})` }}
            />
          </div>
          <div
            className="buybolts-header-shadow-image"
            style={{ backgroundImage: `url(${ellipse})` }}
          />
        </div>
      </div>

      {renderListing2.map((item) => (
        <div className="buyboults-row1">
          <div onClick={paymentPage}>
            <BuyBoultsCard
              bolts={item[0].flashes_no}
              price={item[0].amount}
              onClick={paymentPage}
            />
          </div>
          {item.length >= 2 && (
            <BuyBoultsCard bolts={item[1].flashes_no} price={item[1].amount} />
          )}
          {item.length === 3 && (
            <BuyBoultsCard
              bolts={item[2].flashes_no}
              price={item[2].amount}
              onClick={paymentPage}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default BuyBoults;
