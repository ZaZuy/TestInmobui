import axios from "axios";

export const mainUrl = "http://localhost:8085";

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export function callApi(url, method, data = {}) {
  const token = localStorage.getItem("token") || "";
  console.log(token,"22222")
  return axios({
    method,
    url: url || `${mainUrl}`,
    data,
    headers: token ? {
      Authorization:  `Bearer ${token}`,
    } : {}
  }).catch((e) => {
    console.log("error", e);
    localStorage.setItem("token", "");
    if(token)
      return (window.location.reload());
  });
}
