import { toast } from "react-hot-toast";

export const SendMailValidation = (item) => {
  if (item?.object?.length === 0) {
    toast.error("subject is required");
    return false;
  }

  if (item?.content?.length === 0) {
    toast.error("content is required");
    return false;
  }

  return true;
};
