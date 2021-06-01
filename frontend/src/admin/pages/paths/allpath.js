import React from "react";
import { useQuery } from "@apollo/react-hooks";

import TableReusable from "../../components/TableReusable";
import { findallpaths } from "../../graphql/gql";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function AllPaths() {
  const { data, loading } = useQuery(findallpaths);
  const tablelabels = [
    "Path ID",
    "PathName",
    "Difficulty",
    "Flashes",
    "Courses",
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
            {data && console.log(data.findallpaths)}
            {data && (
              <TableReusable
                flag="allpaths"
                tablelabels={tablelabels}
                tablelist={data.findallpaths}
              ></TableReusable>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AllPaths;
