import React from "react";
import "./PaymentBolts.css";
import Footer from "./components/Smallfooter";
import logo from "./images/mainlogo.png";
function PaymentBolts() {
  return (
    <>
      <div className="payment-bolts-container">
        <div className="payment-bolts-black-container">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} style={{ height: "5vw", paddingTop: "10px" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "sans-serif",
              fontSize: "12px",
            }}
          >
            <div style={{ paddingRight: "10px" }}>Proceed with Payment</div>
          </div>
        </div>
        <div className="payment-bolts-gray-container">
          <div>
            <div style={{ display: "flex", width: "40vw" }}>
              <div
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundColor: "#000",
                  borderRadius: "7px",
                  backgroundImage: `url(
                    ./images/boost.png)`,
                }}
              />
              <div
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>fdsnkfks</p>
                <p>dfnskjn</p>
              </div>
            </div>
            <hr
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                border: "1px solid #e1e1e1",
              }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <input type="text" placeholder="Discount coupon" />
              <button
                style={{
                  backgroundColor: "#c4c4c4",
                  color: "white",
                  border: "0px",
                  height: "35px",
                  width: "80px",
                  borderRadius: "7px",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
            <hr
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                border: "0.5px solid #e1e1e1",
              }}
            />
            <div style={{ width: "40vw" }}>
              <div
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Subtotal</p>
                <p>Rs 100</p>
              </div>
              <div
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Discount</p>
                <p>-Rs 20</p>
              </div>
            </div>
            <hr
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                border: "0.5px solid #e1e1e1",
              }}
            />
            <div style={{ width: "40vw" }}>
              <div
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p>Total</p>
                <p>Rs 80</p>
              </div>
            </div>
            <div
              style={{
                width: "40vw",
                display: "flex",
                justifyContent: "flex-end",

                marginTop: "50px",
              }}
            >
              <button
                style={{
                  height: "33px",
                  width: "100px",
                  border: "0px",
                  backgroundColor: "#ff4d15",
                  color: "#fff",
                  borderRadius: "7px",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentBolts;
