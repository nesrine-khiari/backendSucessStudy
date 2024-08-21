import keys from "./sousadmins.keys";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";

const GetAllSousAdmins = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/users/getStudents?role=sousadmin`,
        Mquery(query)
      );
      dispatch({
        type: keys.set_sousadmins,
        value: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const CreateSousAdmin = (user, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/users/addSousAdmin`, {
        ...user,
      });
      console.log(response);
      // forward user to verif page
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Sous Admin Created Successfully`);
      dispatch(GetAllSousAdmins());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const DeleteSousAdminByAdmin = (user, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.delete(`/api/v1/users/delete/${user.id}`);
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Sous Admin Deleted Successfully`);
      dispatch(GetAllSousAdmins());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const BlockSousAdminByAdmin = (user, callback) => {
  const { suspended, id } = user;
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.put(`/api/v1/users/block-user/${id}`, {
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
      dispatch(GetAllSousAdmins());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const UpdateSousAdminByAdmin = (user, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(
        `/api/v1/users/profile-by-admin/${user.id}`,
        {
          ...user,
        }
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`User Updated successfully`);
      dispatch(GetAllSousAdmins());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

export {
  BlockSousAdminByAdmin,
  CreateSousAdmin,
  GetAllSousAdmins,
  DeleteSousAdminByAdmin,
  UpdateSousAdminByAdmin,
};
