import { toast } from "react-hot-toast";
export const Create_univ_valid = (item) => {
  if (item?.nom?.length === 0) {
    toast.error("Libelle is required");
    return false;
  }

  if (item?.fullName?.length === 0) {
    toast.error("full Name is required");
    return false;
  }

  if (item?.OrganMere?.length === 0) {
    toast.error("Organisation Mére is required");
    return false;
  }

  if (item?.tel?.length === 0) {
    toast.error("Numero de Telephone is required");
    return false;
  }

  if (item?.pays?.length === 0) {
    toast.error("Pays is required");
    return false;
  }

  if (item?.address?.length === 0) {
    toast.error("Address is required");
    return false;
  }

  if (item?.logo?.length === 0) {
    toast.error("Logo is required");
    return false;
  }

  if (item?.cover?.length === 0) {
    toast.error("Cover photo is required");
    return false;
  }

  if (item?.description?.length === 0) {
    toast.error("description is required");
    return false;
  }

  if (item?.long_desc?.length === 0) {
    toast.error("Long Description is required");
    return false;
  }
  return true;
};

export const Update_univ_valid = (item) => {
  if (item?.nom?.length === 0) {
    toast.error("Libelle is required");
    return false;
  }

  if (item?.fullName?.length === 0) {
    toast.error("full Name is required");
    return false;
  }

  if (item?.OrganMere?.length === 0) {
    toast.error("Organisation Mére is required");
    return false;
  }

  if (item?.tel?.length === 0) {
    toast.error("Numero de Telephone is required");
    return false;
  }

  if (item?.pays?.length === 0) {
    toast.error("Pays is required");
    return false;
  }

  if (item?.address?.length === 0) {
    toast.error("Address is required");
    return false;
  }

  if (item?.description?.length === 0) {
    toast.error("description is required");
    return false;
  }

  if (item?.long_desc?.length === 0) {
    toast.error("Long Description is required");
    return false;
  }
  return true;
};

export const CreateSousAdminValidation = (item) => {
  if (item?.firstName?.length === 0) {
    toast.error("first name is required");
    return false;
  }

  if (item?.lastName?.length === 0) {
    toast.error("last name is required");
    return false;
  }

  if (item?.email?.length === 0) {
    toast.error("Email is required");
    return false;
  }

  if (item?.tel?.length === 0) {
    toast.error("Numero de Telephone is required");
    return false;
  }

  if (item?.password?.length === 0) {
    toast.error("Password is required");
    return false;
  }

  return true;
};

export const UpdateSousAdminValidation = (item) => {
  if (item?.firstName?.length === 0) {
    toast.error("first name is required");
    return false;
  }

  if (item?.lastName?.length === 0) {
    toast.error("last name is required");
    return false;
  }

  if (item?.email?.length === 0) {
    toast.error("Email is required");
    return false;
  }

  if (item?.tel?.length === 0) {
    toast.error("Numero de Telephone is required");
    return false;
  }

  if (item?.pays?.length === 0) {
    toast.error("Pays is required");
    return false;
  }

  return true;
};
