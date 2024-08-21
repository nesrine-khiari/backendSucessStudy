import { toast } from "react-hot-toast";

export const UpdateStatusValidation = (item) => {
  if (item?.status !== "complete" && item?.status !== "not_complete" && item?.status !== "fail") {
    toast.error("error check the values");
    return false;
  }


  return true;
};
