import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import {
  FaTv,
  FaHeart,
  FaBook,
  FaRoute,
  FaRegPaperPlane,
  FaUser,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import logo from "../../pages/images/mainlogo.png";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className='sidebar'>
      <ProSidebar collapsed={false} width='20vw'>
        <SidebarHeader>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img style={{ height: 40, opacity: 0.6 }} src={logo} />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape='circle' popperArrow={true}>
            <MenuItem icon={<FaTv />}>
              {" "}
              <Link to='/admindashboard' />
              Dashboard
            </MenuItem>
            <SubMenu title='Users' icon={<FaUser />}>
              <MenuItem>
                <Link to='/usersgist' />
                Users Gist
              </MenuItem>
              <MenuItem>
                <Link to='/userspayments' />
                Users Payments
              </MenuItem>
              <MenuItem>
                <Link to='/userssecurity' />
                Users Security
              </MenuItem>
            </SubMenu>
            <SubMenu title='Flashes' icon={<FaHeart />}>
              <MenuItem>
                <Link to='/addflash' />
                Add Flash
              </MenuItem>

              <MenuItem>
                <Link to='/allflashes' />
                All Flashes
              </MenuItem>
            </SubMenu>
            <SubMenu title='Courses' icon={<FaBook />}>
              <MenuItem>
                <Link to='/addcourse' />
                Add Course
              </MenuItem>
              <MenuItem>
                <Link to='/editcourse' />
                Edit Course
              </MenuItem>
              <MenuItem>
                <Link to='/allcourses' />
                All Courses
              </MenuItem>
            </SubMenu>
            <SubMenu title='Paths' icon={<FaRoute />}>
              <MenuItem>
                {" "}
                <Link to='/addpath' />
                Add Path
              </MenuItem>
              <MenuItem>
                <Link to='/editpath' />
                Edit Path
              </MenuItem>
              <MenuItem>
                <Link to='/allpaths' />
                All Paths
              </MenuItem>
            </SubMenu>

            <SubMenu title='Pages' icon={<FaRegPaperPlane />}>
              <MenuItem>
                <Link to='/socialhandle' />
                Social Handles
              </MenuItem>
              <MenuItem>
                <Link to='/privacypolicy' />
                Privacy Policy
              </MenuItem>
              <MenuItem>
                <Link to='/termsandcondition' />
                Terms & Condition
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            Kleen Security
          </h5>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
