import React from "react";
import { useQuery } from "@apollo/react-hooks";

import TableReusable from "../../components/TableReusable";
import { findallPayments } from "../../graphql/gql";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
function UsersPayments() {
  const { data, loading } = useQuery(findallPayments);
  const tablelabels = [
    "Email",
    "Transaction_id",
    "Time",
    "Amount",
    "Flashes",
    "Discount",
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
            {data && (
              <TableReusable
                flag="userpayments"
                tablelabels={tablelabels}
                tablelist={data.finduser}
              ></TableReusable>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UsersPayments;
