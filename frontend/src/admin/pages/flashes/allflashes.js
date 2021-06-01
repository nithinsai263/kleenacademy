import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import TableReusable from "../../components/TableReusable";
import { findallflashes } from "../../graphql/gql";
function AllFlashes({history}) {
  const { data, loading } = useQuery(findallflashes);
  const tablelabels = [
    "ID",
    "Number of Flashes",
    "Amount",
    "Discount Coupons ",
    "Delete",
  ];
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#fff",
            }}
          >
            {data && console.log(data.findallflashes)}
            {data && (
              <TableReusable
                flag="allflashes"
                tablelabels={tablelabels}
                tablelist={data.findallflashes}
                history={history}
              ></TableReusable>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AllFlashes;
