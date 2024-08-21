import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { GetUserByToken } from "../redux/user/user.actions";
import { isSousAdmin, isSuperAdmin } from "../custom/roles";

import Spinner from "../MyComponents/Spinner/Spinner";
// ** pages
import Login from "../pages/login/Login";
import DashboardPage from "../pages/dashboard/Dashboard";
import { socket } from "../functions/socket.io";
import { Mquery } from "../functions/MakeQuery";

function MainRoutest() {
  const user = useSelector((state) => state.UserReducer);
  const [loading, setLoading] = useState(true);
  const [msg, setmsg] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUserByToken(succ, fail));
    socket.on("connect", () => {
      socket.on("onlineuser", (data) => {
        console.log(data);
      });
    });
  }, []);

  useEffect(() => {
    if (user.is_connected) socket.emit("newUser", user.user.email);
  }, [user]);

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
    <BrowserRouter>
      {!user.is_connected && <NotSignedRoutes />}
      {user.is_connected && isSuperAdmin(user.user) && <SuperAdminRoutes />}
      {user.is_connected && isSousAdmin(user.user) && <SousAdminRoutes />}
    </BrowserRouter>
  );
}

const NotSignedRoutes = () => {
  return (
    <>
      <Route path="/sign-in" component={Login} />
      <Route path="/forget-pass" component={Login} />
      <Route exact path="/*">
        <Redirect to="/sign-in" />
      </Route>
    </>
  );
};

const SuperAdminRoutes = () => {
  return (
    <>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/*">
        {/* <Redirect to="/dashboard" /> */}
        <Redirect to="/dashboard" />
      </Route>
    </>
  );
};

const SousAdminRoutes = () => {
  return (
    <>
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/*">
        <Redirect to="/dashboard" />
      </Route>
    </>
  );
};

export default MainRoutest;

/*
*********************************** ALL ROUTES ***********************************
<BrowserRouter>
        <Routes>
        </Routes>
</BrowserRouter>
*/
