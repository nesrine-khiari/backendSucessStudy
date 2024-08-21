import keys from "./user.keys";
import conv_keys from "../conversation/conversation.key";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { InitialState } from "./user.reducer";
import { GetOneUniv } from "../university/university.actions";
import { isResp } from "../../custom/roles";
import { uploadProgress, uploadSuccess } from "../uploads/uplaodAction";

const ActionLogin = (user, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      // to get response from back
      const response = await axios.post(`/api/v1/auth/login`, {
        ...user,
      });

      // to get user and token objects
      const real_user = response?.data?.data?.user;
      const real_toke = response?.data?.data?.token;

      // to test if the account is not verified
      if (!real_user?.verified) {
        toast.error(`veuillez vérifier votre compte`);
        return false;
      }

      // to test if the account is suspended
      if (real_user?.suspended) {
        toast.error(`votre compte est suspondu`);
        return false;
      }

      if (isResp(real_user)) {
        // that user is a univ responsible so let's get his university
        dispatch(GetOneUniv(real_user.Universite));
      }

      // every thing is ok here
      dispatch({
        type: keys.all,
        value: {
          payload: false,
          is_connected: true,
          user: real_user,
        },
      });

      // to set the token and reftoken in storage
      window.location.reload();
      localStorage.setItem("accessToken", real_toke?.accessToken);
      localStorage.setItem("refreshToken", real_toke?.refreshToken);
      toast.success(`Bonjour ${real_user.firstName} ${real_user.lastName}`, {});

      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
      console.log(error?.response);
      toast.error(error?.response?.data?.message);
    }
  };
};

const ActionRegister = (user, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/auth/register`, {
        ...user,
      });

      // forward user to verif page
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`un email de validation a été envoyé à ton adresse`);
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const ActionRegisterUniv = (formdata, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/auth/register-univ`, {
        ...formdata,
      });
      console.log(response);
      // forward user to verif page
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(
        `votre demande de creation d'une université est en train de traitement`
      );
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};
const ActionForgot = (formdata, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/v1/auth/forgot-password`, {
        ...formdata,
      });
      console.log(response);

      toast.success(`Email a été envoyé vers vous !`);
      callback();
    } catch (error) {
      toast.error(`Erreur lors de l'envoie de l'email.`);
    }
  };
};
const GetUserByToken = (callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/users/profile`);
      const real_user = response.data;

      if (real_user?.suspended) {
        toast.error(`votre compte est suspondu`);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        dispatch({
          type: keys.all,
          value: {
            ...InitialState,
          },
        });
        callback();
        return false;
      }

      if (isResp(real_user)) {
        // that user is a univ responsible so let's get his university
        dispatch(GetOneUniv(real_user.Universite));
      }

      dispatch({
        type: keys.all,
        value: {
          payload: false,
          is_connected: true,
          user: response.data,
        },
      });
      // toast.success(`Bonjour ${real_user.firstName} ${real_user.lastName}`);
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
      callback();
      console.log(error?.response);
      // toast.error(error?.response?.data?.message);
    }
  };
};

const VerifyMailByToken = (token, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/auth/verify-account/${token}`);
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Mail Verified Successfully`);
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};
const UpdatePassword = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });

      const response = await axios.put(
        `/api/v1/users/profile-update-v1/${id}`,
        {
          ...data,
        }
      );

      console.log(response);

      dispatch({
        type: keys.payload,
        value: false,
      });

      toast.success(`Password Changed successfully`);
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });

      if (error.response && error.response.status === 401) {
        // Unauthorized - old password is incorrect
        toast.error("Old password is incorrect");
      } else {
        // Other server errors
        toast.error("An error occurred while changing the password");
      }
    }
  };
};

const UpdateProfile = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(
        `/api/v1/users/profile-update-v1/${id}`,
        {
          ...data,
        }
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Profile Changed successfully`);
      dispatch(GetUserByToken(() => {}));
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const UpdateProfileDocs = (files, id, callback) => {
  const formData = new FormData();

  formData.append("CV", files.CV);
  formData.append("diplome", files.diplome);
  formData.append("releveDeNote", files.releveDeNote);
  formData.append("passeport", files.passeport);
  formData.append("motivation", files.motivation);

  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(`/api/v1/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(uploadProgress(percentage));
        },
      });
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      callback();
      dispatch(GetUserByToken(() => {}));
      toast.success(`Profile Changed successfully`);
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const UpdateProfileImg = (files, id) => {
  const formData = new FormData();
  formData.append("picture", files.picture);

  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(`/api/v1/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(uploadProgress(percentage));
        },
      });
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      dispatch(GetUserByToken(() => {}));
      toast.success(`Profile Changed successfully`);
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const SendFeedBack = (feedback, callback) => {
  console.log(feedback);
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/feedBack/createFeedBack`, {
        ...feedback,
      });
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Feedback Sent successfully`);
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const Disconnect = () => {
  return (dispatch) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch({
      type: keys.all,
      value: {
        ...InitialState,
      },
    });
    dispatch({
      type: conv_keys.set_messages,
      value: [],
    });
  };
};

export {
  ActionLogin,
  ActionRegister,
  ActionRegisterUniv,
  GetUserByToken,
  VerifyMailByToken,
  UpdateProfile,
  UpdatePassword,
  UpdateProfileDocs,
  UpdateProfileImg,
  SendFeedBack,
  Disconnect,
  ActionForgot,
};
