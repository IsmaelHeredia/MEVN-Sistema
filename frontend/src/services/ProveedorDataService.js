import axios from "axios";

class ProveedorDataService {
  getAll() {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).get("/proveedores");
  }

  get(id) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).get(`/proveedores/${id}`);
  }

  create(data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).post("/proveedores", data);
  }

  update(id, data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).put(`/proveedores/${id}`, data);
  }

  delete(id) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).delete(`/proveedores/${id}`);
  }

}

export default new ProveedorDataService();