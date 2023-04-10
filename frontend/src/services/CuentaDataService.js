import axios from "axios";

class CuentaDataService {

  cambiarUsuario(data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).post("/cuenta/cambiarUsuario", data);
  }

  cambiarClave(data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).post("/cuenta/cambiarClave", data);
  }

}

export default new CuentaDataService();