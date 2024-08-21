import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VerifyMailByToken } from "../redux/user/user.actions";

function VerifMail() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const success = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    console.log(token);
    if (token) {
      dispatch(VerifyMailByToken(token, success));
    }
  }, [token]);

  return <div></div>;
}

export default VerifMail;
