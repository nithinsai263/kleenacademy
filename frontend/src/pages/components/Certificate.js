import React from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "./Certificate.css";
function Certificate() {
  const printPDF = () => {
    const domElement = document.getElementById("certificate-container");
    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("certificate-container").style.visibility =
          "block";
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf("l", "mm", [220, 160]);
      pdf.addImage(imgData, "JPEG", 10, 5, 210, 130);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  };

  return (
    <div>
      <div className="certificate-main-page-container">
        <div className="certificate-container" id="certificate-container">
          <div style={{ padding: "150px 0px", marginLeft: "-200px" }}>
            <div className="certificate-title-container">
              <h1 className="certificate-title">
                C e r t i f i c a t e o f C o m p l e t i o n
              </h1>
            </div>
            <div className="certificate-sub-container">
              <div>
                <div style={{ textAlign: "center" }}>
                  <h5>THIS ACKNOWLEDGES THAT</h5>
                  <h1 style={{ fontSize: "35px", marginTop: "10px" }}>
                    Shiva Siddula
                  </h1>
                </div>
                <div style={{ marginTop: "50px", textAlign: "center" }}>
                  <h5>HAS SUCCESSFULLY COMPLETED </h5>
                  <h5 style={{ marginTop: "5px" }}>
                    THE EXCELLENCE IN NMAP A-Z{" "}
                  </h5>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "100px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <p>Signature:</p>
                <i
                  style={{ borderBottom: "1px solid gray", marginLeft: "10px" }}
                >
                  John Doe
                </i>
              </div>
              <div style={{ display: "flex" }}>
                <p>Signature:</p>
                <i
                  style={{ borderBottom: "1px solid gray", marginLeft: "10px" }}
                >
                  John Doe
                </i>
              </div>
            </div>
          </div>
        </div>
        <div className="certificate-button-container">
          <button className="certificate-button" onClick={printPDF}>
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
