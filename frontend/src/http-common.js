import axios from "axios";

var token = sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)

export default axios.create({
  baseURL: process.env.VUE_APP_URL_BACKEND,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
    token: token
  }
});