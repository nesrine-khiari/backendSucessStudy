import keys from "./student.keys";
import { toast } from "react-hot-toast";
// import { useSelector } from "react-redux";
import axios from "../../custom/axios";
import { InitialState, init_student } from "./student.reducer";
import { Mquery } from "../../functions/MakeQuery";

const GetAllStudents = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/users/getStudents?role=user`,
        Mquery(query)
      );
      dispatch({
        type: keys.set_students,
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

const DeleteStudentByAdmin = (user, callback) => {
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
      toast.success(`Student Deleted Successfully`);
      dispatch(GetAllStudents());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const BlockUserByAdmin = (user, callback) => {
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
      dispatch(GetAllStudents());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const UpdateStudentByAdmin = (user, callback) => {
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
      dispatch(GetAllStudents());
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
  BlockUserByAdmin,
  GetAllStudents,
  DeleteStudentByAdmin,
  UpdateStudentByAdmin,
};
