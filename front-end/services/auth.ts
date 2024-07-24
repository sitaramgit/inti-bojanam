import axios from "axios";
import { apiEndPoints } from "../common/apiEndPoints";

const createUser = (payload: any) => {
  axios
    .post(`${apiEndPoints.host_api.host}${apiEndPoints.auth.register}`, payload)
    .then((res: any) => console.log(res))
    .catch((e) => console.log(e));
};

const socialLogin = (code: any) => {
  axios
    .post(`${apiEndPoints.host_api.host}${apiEndPoints.auth.socialLogin}`, {
      code,
    })
    .then((res: any) => {
      if (res?.data?.access_token)
        localStorage.setItem("access_token", res.data.token);
    })
    .catch((e) => console.log(e));
};

const loginUser = (payload: any) => {
  axios
    .post(`${apiEndPoints.host_api.host}${apiEndPoints.auth.login}`, payload)
    .then((res: any) => {
      if (res?.data?.token)
        localStorage.setItem("access_token", res.data.token);
    })
    .catch((e) => console.log(e));
};

export const authService = {
  createUser,
  socialLogin,
  loginUser,
};
