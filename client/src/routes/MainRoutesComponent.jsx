import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isUser, isResp } from "../custom/roles";

// ** pages
import AboutUs from "../view/AboutUs/AboutUs";
import MainDestinations from "../view/MainDestinations";
import SignIn from "../view/SignIn/SignIn";
import SignUp from "../view/SignUp/SignUp";
import ContactUs from "../view/ContactUs";
import HelpCenter from "../view/HelpCenter";
import DiscoverOurService from "../view/DiscoverOurService";
import StudyInFrance from "../view/StudyInFrance";
import Dashboard from "../view/Dashboard";
import SendDemand from "../view/SendDemand";
import Profile from "../view/Profile";
import CityUniversities from "../view/CityUniversities";
import ViewUniversity from "../view/ViewUniversity";
import Countries from "../view/Countries";
import StudentProfileCard from "../view/StudentProfileCard";
import UniversityProfile from "../view/UniversityProfile";
import { GetUserByToken } from "../redux/user/user.actions";
import Spinner from "../components/Spinner";
import LanddingPage from "../view/LandingPage";

import VerifMail from "../view/VerifMail";
import LogOut from "../view/Logout";

import Messenger from "../components/Messenger/Messenger";
import { socket } from "../functions/socket.io";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { notificationGetOwn } from "../custom/instance";
import Privacy from "../view/privacy";
import MentionLegal from "../view/mention-legal";
import ForgotPwd from "../view/forgot-pwd/forgot-pwd";
import SendEmailPage from "../view/change-email/forgot-pwd";

function MainRoutesComponent() {

  const user = useSelector((state) => state.UserReducer);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();


  useEffect(() => {
    if (user.is_connected) socket.emit("newUser", user.user.email);
  }, [user.is_connected]);



  useEffect(() => {
    dispatch(GetUserByToken(succ, fail));

    socket.on('getNotfi', ({ data }) => {

      if (data.status == true)
        toast.success(data.content, {
          duration: 4000,
          position: 'bottom-right',
        })
      else
        toast.error(data.content, {
          duration: 4000,
          position: 'bottom-right',
        })
    })
    // Scroll to the top of the page when the component mounts


  }, []);

  const succ = (resp) => {
    setLoading(false);
  };
  const fail = (error) => {
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={{ position: "relative" }}>
      <BrowserRouter>
        {!user.is_connected && <NotSignedRoutes />}
        {isUser(user.user) && <UserRoutes />}
        {isResp(user.user) && <RespRoutes />}
        {user.is_connected && <Messenger />}
      </BrowserRouter>
    </div>
  );
}

const NotSignedRoutes = () => {
  return (
    <Routes>
      <Route path="/forget-pass" element={<ForgotPwd />} />
      <Route path="/verify-email" element={<SendEmailPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/verif/:token" element={<VerifMail />} />
      <Route path="/destinations" element={<MainDestinations />} />
      <Route path="/discover-our-services" element={<DiscoverOurService />} />
      <Route path="/our-services" element={<StudyInFrance />} />
      <Route path="/our-services-student" element={<SendDemand />} />
      <Route path="/" element={<LanddingPage></LanddingPage>} />
      {/*         <Route path="/our-destinations" element={<MainDestinations />} /> */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/university" element={<ViewUniversity />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/student" element={<StudentProfileCard />} />
      <Route path="/politique-de-confidentialité" element={<Privacy />} />
      <Route path="/mentions-légales" element={<MentionLegal />} />
      <Route path="/*" element={<Navigate to="/sign-in" />} />
    </Routes>
  );
};

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/logout" element={<LogOut />} />
      <Route path="/destinations" element={<MainDestinations />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/our-services" element={<StudyInFrance />} />
      <Route path="/our-services-student" element={<SendDemand />} />
      <Route path="/" element={<LanddingPage></LanddingPage>} />
      <Route path="/politique-de-confidentialité" element={<Privacy />} />
      <Route path="/mentions-légales" element={<MentionLegal />} />
      <Route path="/send_demand/:iduniv/:idforma" element={<SendDemand />} />
      {/*         <Route path="/our-destinations" element={<MainDestinations />} /> */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/city/:city" element={<CityUniversities />} />
      <Route path="/university/:city/:_id" element={<ViewUniversity />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/student" element={<StudentProfileCard />} />
      <Route path="/university/config" element={<UniversityProfile />} />
      <Route path="/*" element={<Navigate to="/profile" />} />
    </Routes>
  );
};

const RespRoutes = () => {
  return (
    <Routes>
      <Route path="/logout" element={<LogOut />} />
      <Route path="/destinations" element={<MainDestinations />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/discover-our-services" element={<DiscoverOurService />} />
      <Route path="/our-services" element={<StudyInFrance />} />
      <Route path="/our-services-student" element={<SendDemand />} />
      <Route path="/" element={<LanddingPage></LanddingPage>} />
      <Route path="/politique-de-confidentialité" element={<Privacy />} />
      <Route path="/mentions-légales" element={<MentionLegal />} />
      {/*         <Route path="/our-destinations" element={<MainDestinations />} /> */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/city/:city" element={<CityUniversities />} />
      <Route path="/university/:city/:_id" element={<ViewUniversity />} />
      <Route path="/university" element={<ViewUniversity />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/university/config" element={<UniversityProfile />} />
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default MainRoutesComponent;
