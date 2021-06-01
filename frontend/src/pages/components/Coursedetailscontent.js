import React from "react";
import "./Coursedetailscontent.css";
function Coursedetailscontent({ coursedetailcontent, sections }) {
  return (
    <div className="coursedetails-content-parent-container">
      <div className="coursedetails-content-text-container">
        {coursedetailcontent.map((items) => (
          <div className="coursedetails-content-left-container">
            <div className="coursedetails-content-heading-container">
              <h1 className="coursedetails-content-heading1">
                {" "}
                {items.title1}
              </h1>
              <h2 className="coursedetails-content-heading2">
                {" "}
                {items.title2}
              </h2>
            </div>
            {items.content.map((para) => (
              <p className="coursedetails-content-para">{para}</p>
            ))}
          </div>
        ))}
      </div>

      <div className="coursedetails-content-section-parent">
        <div>
          <div className="coursedetails-section-heading-container">
            <h2 className="coursedetails-section-heading-text">Sections</h2>
          </div>
          <div>
            {sections.map((section) => (
              <div className="coursedetails-section-list-item">
                <div className="coursedetails-section-circle-list"></div>
                <h4
                  className="coursedetails-section-list-text"
                  style={{ color: "white" }}
                >
                  {section}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coursedetailscontent;
