import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./Dashboard.css";
import hacker from "../../../pages/images/hacker.png";
import Card1 from "./Card1";
import TableReusable from "../../components/TableReusable";
import MyChart from "./MyChart";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <div style={{ minHeight: "100vh", backgroundColor: "#ebedef" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img style={{ height: "150px" }} src={hacker} />
            <div className="dashboard-title">
              <h4 style={{ marginTop: "10px" }}> Hey Wassaappp</h4>
              <h6 style={{ marginTop: "10px", color: "#777" }}>
                Welcome to admin dashboard
              </h6>
            </div>
          </div>
          <div className="dashboard-tile-container">
            <Card1 Icon="user" title="Number of Users" Number="200" />
            <Card1 Icon="video" title="Number of Courses" Number="100" />
            <Card1 Icon="paths" title="Number of Paths" Number="5" />
            <Card1 Icon="likes" title="Number of Likes" Number="50" />
          </div>
          <div className="dashboard-tile2-container">
            <div className="dashboard-card2-container">
              <h3
                style={{ marginTop: "10px", color: "#777", fontSize: "15px" }}
              >
                Order Traffic
              </h3>
              <div style={{position:"relative"}}>
                <Line data={data}  />
                </div>
              
            </div>
            <div className="dashboard-card2-container">
              <h3
                style={{ marginTop: "10px", color: "#777", fontSize: "15px" }}
              >
                Stats Reports
              </h3>
              <div className="dashboard-card2-wrapper1">
                <div className="dashboard-card2-tile1">
                
                  <div>
                    <h3>Income</h3>
                    <p>12398</p>
                  </div>
                </div>
                <div className="dashboard-card2-tile2">
                  <div>
                    <h3>Sales</h3>
                    <p>12398</p>
                  </div>
                </div>
              </div>
              <div className="dashboard-card2-wrapper1">
                <div className="dashboard-card2-tile3">
                  <div>
                    <h3>Subscribers</h3>
                    <p>12398</p>
                  </div>
                </div>
                <div className="dashboard-card2-tile4">
                  <div>
                    <h3>Orders</h3>
                    <p>12398</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-tile3-container">
            <TableReusable
              flag="payments"
              tablelabels={["wee", "woo", "blee", "blue"]}
              tablelist={[]}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
