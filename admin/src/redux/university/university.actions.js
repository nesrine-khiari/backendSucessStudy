import keys from "./university.keys";
import { toast } from "react-hot-toast";
import axios from "../../custom/axios";
import { Mquery } from "../../functions/MakeQuery";
import { init_manager } from "./university.reducer";

const Getformations = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/university/getFormations`, Mquery(query));
      dispatch({
        type: keys.set_formations,
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
const GetAllUnivs = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/university/getAll`,
        Mquery(query)
      );
      console.log(response);
      dispatch({
        type: keys.setUnivs,
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

const CreateUniv = (data, callback) => {
  const formData = new FormData();
  formData.append("logo", data.logo);
  formData.append("cover", data.cover);

  delete data.logo;
  delete data.cover;
  formData.append("data", JSON.stringify(data));

  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(`/api/v1/university/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(GetAllUnivs());
      toast.success("University Created Successfully");
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const UpdateUnivAction = (data, callback) => {
  delete data.logo;
  delete data.cover;

  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.put(
        `/api/v1/university/update_by_admin/${data._id}`,
        {
          ...data,
        }
      );
      console.log(response);
      dispatch(GetAllUnivs());
      toast.success("University Updated Successfully");
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const ApproveUniv = (univ, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.put(
        `/api/v1/university/approve/${univ._id}`
      );
      console.log(response);
      dispatch(GetAllUnivs());
      toast.success("University Approved Successfully");
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const DeleteUniv = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.delete(
        `/api/v1/university/delete/${data._id}`
      );
      console.log(response);
      dispatch(GetAllUnivs());
      toast.success("University Deleted Successfully");
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetOneUniv = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/university/getOne/${_id}`);
      dispatch({
        type: keys.setSelUniv,
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

const CreateManagerForUniv = (manager, univ, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(
        `/api/v1/university/addAdmin/${univ._id}`,
        {
          ...manager,
        }
      );
      console.log(response);
      // forward user to verif page
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Manager Created Successfully`);
      dispatch(GetAllUnivs());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetAllManagers = (query = {}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/users/getStudents?role=responsable`,
        Mquery(query)
      );
      dispatch({
        type: keys.set_allManagers,
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

const GetManagerByUniv = (univ) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/university/getAdmin/${univ._id}`
      );
      dispatch({
        type: keys.setManager,
        value: response.data.data[0],
      });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const DeleteManagerByAdmin = (manager, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.delete(
        `/api/v1/university/delAdmin/${manager._id}`
      );
      console.log(response);
      // forward user to verif page
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success(`Manager Deleted Successfully`);
      dispatch({
        type: keys.setManager,
        value: { ...init_manager },
      });
      dispatch(GetAllUnivs());
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetFormasByIdUniv = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/university/getFormations/${_id}`
      );
      dispatch({
        type: keys.setFormas,
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

const CreateFormation = (data, id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(
        `/api/v1/university/addFormation/${id}`,
        { ...data }
      );
      console.log(response);
      toast.success("formation created successfully");
      dispatch(GetFormasByIdUniv(id));
      // dispatch({
      //   type: keys.setFormas,
      //   value: response.data.data,
      // });
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetDemandsByIdUniv = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(`/api/v1/demande/getAll/${_id}`);
      console.log(response);
      dispatch({
        type: keys.setDemands,
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

const ChangeDemandeStatus = (demande, statut, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(`/api/v1/demande/update_demande`, {
        statut,
        id_demande: demande._id,
      });
      console.log(response);
      dispatch(GetDemandsByIdUniv(demande.Universite));
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const GetDemandsByIdUnivApproved = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/demande/getAll/${_id}?statut=verfie`
      );
      console.log(response);
      dispatch({
        type: keys.setDemands,
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

const GetDemandsByIdUnivRefused = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/demande/getAll/${_id}?statut=refuse`
      );
      console.log(response);
      dispatch({
        type: keys.setDemands,
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

export {
  GetAllUnivs,
  GetOneUniv,
  CreateUniv,
  DeleteUniv,
  ApproveUniv,
  UpdateUnivAction,
  GetAllManagers,
  GetManagerByUniv,
  CreateManagerForUniv,
  DeleteManagerByAdmin,
  GetFormasByIdUniv,
  CreateFormation,
  GetDemandsByIdUniv,
  ChangeDemandeStatus,
  GetDemandsByIdUnivApproved,
  GetDemandsByIdUnivRefused,
  Getformations
};
