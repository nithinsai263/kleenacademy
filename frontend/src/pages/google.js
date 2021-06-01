import React, { useEffect } from "react";

export default function Google() {
  useEffect(() => {
    fetch("http://localhost:4000/google");
  });
  return <div></div>;
}
