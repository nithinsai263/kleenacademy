import React from "react";
import { useQuery } from "@apollo/react-hooks";

import TableReusable from "../../components/TableReusable";
import { finduser } from "../../graphql/gql";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function UsersGist({ history }) {
  const { data, loading } = useQuery(finduser);
  const tablelabels = [
    "Name",
    "Profession",
    "Email",
    "Badges",
    "Certificates",
    "Flashes",
    "More",
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
                flag="usergist"
                tablelabels={tablelabels}
                tablelist={data.finduser}
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

export default UsersGist;
