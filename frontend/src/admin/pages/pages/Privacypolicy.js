import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TableReusable from "../../components/TableReusable";
import { findallflashes } from "../../graphql/gql";
function Privacypolicy() {
  const { data, loading } = useQuery(findallflashes);
  const tablelabels = [
    "ID",
    "Number of Flashes",
    "Amount",
    "Discount Coupons ",
    "More",
  ];
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}></div>
        <Footer />
      </div>
    </div>
  );
}

export default Privacypolicy;
