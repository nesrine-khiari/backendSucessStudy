import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Disconnect } from "../redux/user/user.actions";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Disconnect());
  }, []);
  return <div></div>;
}

export default Logout;
