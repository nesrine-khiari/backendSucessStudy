import keys from "./university.keys";
import { toast } from "react-hot-toast";
import axios from "../../custom/axios";
import { uploadProgress } from "../uploads/uplaodAction";
// import { InitialState } from "./university.keys";

const GetAllUnivs = (city) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.get(
        `/api/v1/university/getAllFront?pays=${city}&approved=true`
      );
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
      console.log(response.data.data);
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

const SendDemand = (ids, files, callback) => {
  const { univId, formId } = ids;
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
      const response = await axios.post(
        `/api/v1/demande/add/${formId}/${univId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(uploadProgress(percentage));
          },
        }
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      callback();

      toast.success(`Demand Sent Successfully`);
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

const ChangeDemandeStatus = (demande, motif, statut, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(`/api/v1/demande/update_demande`, {
        statut,
        id_demande: demande._id,
        motif,
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

const UpdateFormation = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.patch(
        `/api/v1/university/updateFormation/${data.id}`,
        {
          ...data,
        }
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      callback();
      toast.success("Formation Updated Successfully");
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const UpdateInfoUniv = (id, new_univ, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.put(`/api/v1/university/update/${id}`, {
        ...new_univ,
      });
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      callback();
      dispatch(GetOneUniv(id));
      toast.success("University Updated Successfully");
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const UpdateImagesUniv = (files, id, callback) => {
  const formData = new FormData();

  formData.append("logo", files.logo);
  formData.append("cover", files.cover);
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.put(
        `/api/v1/university/update_images/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      callback();
      dispatch(GetOneUniv(id));
      toast.success("University Updated Successfully");
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

const DeleteFormation = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });

      const response = await axios.delete(
        `/api/v1/university/deleteFormation/${data.id}`
      );
      console.log(response);
      dispatch(GetFormasByIdUniv(data.univId));
      toast.success("Formation Deleted Successfully");
      callback();
    } catch (error) {
      dispatch({
        type: keys.payload,
        value: false,
      });
    }
  };
};

const SendCertif = (data, callback) => {
  const { object, file, email, demand_id } = data;
  const formData = new FormData();
  console.log(file);
  formData.append("certif", file);
  return async (dispatch) => {
    try {
      dispatch({
        type: keys.payload,
        value: true,
      });
      const response = await axios.post(
        `/api/v1/users/sendCertif/${email}/${object}/${demand_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            dispatch(uploadProgress(percentage));
          },
        }
      );
      console.log(response);
      dispatch({
        type: keys.payload,
        value: false,
      });
      toast.success("L'attestation a été bien envoyer !");
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
  GetAllUnivs,
  GetOneUniv,
  GetFormasByIdUniv,
  CreateFormation,
  SendDemand,
  SendCertif,
  UpdateImagesUniv,
  UpdateInfoUniv,
  GetDemandsByIdUniv,
  ChangeDemandeStatus,
  GetDemandsByIdUnivApproved,
  GetDemandsByIdUnivRefused,
  DeleteFormation,
  UpdateFormation,
};
