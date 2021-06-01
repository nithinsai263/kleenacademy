import React, { useEffect, useState } from "react";
import { setAccessToken } from "./accessToke";
import Routes from "./Routes";
function App() {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setloading(false);
    });
  });
  return (
    <div>
      {loading && <div>loading...</div>}
      {!loading && <Routes />}
    </div>
  );
}

export default App;
