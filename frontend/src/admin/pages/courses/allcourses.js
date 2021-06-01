import React from "react";
import { useQuery } from "@apollo/react-hooks";

import TableReusable from "../../components/TableReusable";
import { findall } from "../../graphql/gql";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function AllCourses() {
  const { data, loading } = useQuery(findall);
  const tablelabels = [
    "Course ID",
    "CourseName",
    "Subtitle",
    "Difficulty",
    "Modules",
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
                flag="allcourses"
                tablelabels={tablelabels}
                tablelist={data.findall}
              ></TableReusable>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AllCourses;
