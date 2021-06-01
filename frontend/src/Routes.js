import React from "react";
import PageNotFound from "./pages/PageNotFound";
import "./Routes.css";

import AcademyCourseLandingPage from "./pages/AcademyCourseLandingPage";
import Coursedetails from "./pages/Coursedetails";
import MyCourses from "./pages/MyCourses";
import MyPaths from "./pages/MyPaths";
import VideoCourses from "./pages/VideoCourse";
import AcademyProfilePage from "./pages/AcademyProfilePage";
import Login from "./pages/Login";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AccountDashboard from "./pages/AccountDashboard";
import Signup from "./pages/Signup";
import ScrollToTop from "./pages/components/ScrolltoTop";
import AdminDashboard from "./admin/pages/dashboard/Dashboard";
import AddFlash from "./admin/pages/flashes/addflash";
import AllFlashes from "./admin/pages/flashes/allflashes";
import AddCourse from "./admin/pages/courses/addcourse";
import EditCourse from "./admin/pages/courses/editcourse";
import AllCourses from "./admin/pages/courses/allcourses";
import AllPaths from "./admin/pages/paths/allpath";
import EditPath from "./admin/pages/paths/editpath";
import AddPath from "./admin/pages/paths/addpath";
import UsersGist from "./admin/pages/users/usergist";
import UsersPayments from "./admin/pages/users/userpayments";
import UsersSecurity from "./admin/pages/users/usersecurity";
import Certificate from "./pages/components/Certificate";
import Socialhandle from "./admin/pages/pages/Socialhandle";
import Privacypolicy from "./admin/pages/pages/Privacypolicy";
import Termsandcondition from "./admin/pages/pages/Termsandcondition";
import PaymentBolts from "./pages/PaymentBolts";

function Landing() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path='/' exact component={AcademyCourseLandingPage} />
        <Route path='/coursedetails/:id' exact component={Coursedetails} />
        <Route path='/mycourses' exact component={MyCourses} />
        <Route path='/mypaths' exact component={MyPaths} />
        <Route path='/profilesettings' exact component={AcademyProfilePage} />
        <Route path='/dashboard' exact component={AccountDashboard} />
        <Route
          path='/videocourses/:courseid/:moduleid'
          exact
          component={VideoCourses}
        />
        <Route path='/login' exact component={Login} />
        <Route path='/joinnow' exact component={Signup} />
        <Route exact path='/admindashboard' component={AdminDashboard} />
        <Route exact path='/addflash' component={AddFlash} />
        <Route exact path='/allflashes' component={AllFlashes} />
        <Route exact path='/addcourse' component={AddCourse} />
        <Route exact path='/editcourse' component={EditCourse} />
        <Route exact path='/allcourses' component={AllCourses} />
        <Route exact path='/allpaths' component={AllPaths} />
        <Route exact path='/editpath' component={EditPath} />
        <Route exact path='/addpath' component={AddPath} />
        <Route exact path='/usersgist' component={UsersGist} />
        <Route exact path='/userspayments' component={UsersPayments} />
        <Route exact path='/userssecurity' component={UsersSecurity} />
        <Route exact path='/certificate' component={Certificate} />
        <Route exact path='/socialhandle' component={Socialhandle} />
        <Route exact path='/privacypolicy' component={Privacypolicy} />
        <Route exact path='/termsandcondition' component={Termsandcondition} />
        <Route exact path='/paymentbolts' component={PaymentBolts} />
      </Switch>
    </Router>
  );
}

export default Landing;
