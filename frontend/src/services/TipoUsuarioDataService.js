import axios from "axios";

class TipoUsuarioDataService {
  getAll() {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).get("/tiposusuarios");
  }
}

export default new TipoUsuarioDataService();