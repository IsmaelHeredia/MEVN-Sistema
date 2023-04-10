import axios from "axios";

class UsuarioDataService {
  getAll() {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).get("/usuarios");
  }

  get(id) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).get(`/usuarios/${id}`);
  }

  create(data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).post("/usuarios", data);
  }

  update(id, data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).put(`/usuarios/${id}`, data);
  }

  delete(id) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).delete(`/usuarios/${id}`);
  }

}

export default new UsuarioDataService();