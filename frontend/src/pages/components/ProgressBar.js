import React from "react";
import "./ProgressBar.css";

function ProgressBar({ width, percent }) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setValue((percent * width) / 100);
  });
  return (
    <div>
      <div className="progress-div" style={{ width: width }}>
        <div style={{ width: `${value}px` }} className="progress" />
      </div>
    </div>
  );
}

export default ProgressBar;
