import keys from "./user.keys";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { InitialState } from "./user.reducer";
import { isSousAdmin, isSuperAdmin } from "../../custom/roles";

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

      // that user is not an admin or super admin
      if (!isSuperAdmin(real_user) && !isSousAdmin(real_user)) {
        toast.error(`Unauthorized`);
        return false;
      }

      // to set the token and reftoken in storage
      localStorage.setItem("accessToken", real_toke?.accessToken);
      localStorage.setItem("refreshToken", real_toke?.refreshToken);
      toast.success(`Bonjour ${real_user.firstName} ${real_user.lastName}`);
      // every thing is ok here
      dispatch({
        type: keys.all,
        value: {
          payload: false,
          is_connected: true,
          user: real_user,
        },
      });
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

const BlockUserByAdmin = (user, callback) => {
  const { suspended, _id } = user;
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.put(`/api/v1/users/block-user/${_id}`, {
        suspended: !suspended,
      });
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(
        `User ${!suspended ? "blocked" : "Ubblocked"} successfully`
      );
      // dispatch(GetUserByToken(() => {}));
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const SendOneMail = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/users/sendEmail`, {
        ...data,
      });
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Mail Sent Successfully`);
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const SendManyMails = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/users/sendManyEmail`, {
        ...data,
      });
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Mails Sent Successfully`);
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
  };
};

export {
  ActionLogin,
  ActionRegister,
  ActionRegisterUniv,
  GetUserByToken,
  UpdateProfile,
  UpdateProfileDocs,
  UpdateProfileImg,
  BlockUserByAdmin,
  SendOneMail,
  SendManyMails,
  Disconnect,
};
