import * as React from "react";

function SvgComponent({ color }) {
  return (
    <svg
      width={26}
      height={23}
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.614 21.547l-7.35-3.136L6.189 22l1.134-7.213-6.02-4.878L9.315 8.62 12.678 2l3.831 6.411 8.093.802-5.63 5.226 1.642 7.108z"
        fill={color}
        stroke="#020202"
        strokeMiterlimit={10}
      />
    </svg>
  );
}

export default SvgComponent;
