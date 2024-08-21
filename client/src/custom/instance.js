import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_API_HOST,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken") || "",
    ContentType: "application/json",
  },
});

export async function notificationGet(data) {
  const res = await instance({
    url: "/api/v1/notification",
    method: "post",
    data,
  });

  return res.data;
}
export async function notificationGetOwn(data) {
  const res = await instance({
    url: "/api/v1/notification/get-own-id",
    method: "get",
  });

  return res.data;
}
export async function getAdmin(data) {
  const res = await instance({
    url: "/api/v1/university/getAdmin/" + data,
    method: "get",
  });

  return res.data;
}
