import axios from "axios";

class ProductoDataService {
  getAll() {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).get("/productos");
  }

  get(id) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).get(`/productos/${id}`);
  }

  create(data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).post("/productos", data);
  }

  update(id, data) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).put(`/productos/${id}`, data);
  }

  delete(id) {
    return axios.create({
      baseURL: process.env.VUE_APP_URL_BACKEND,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)}`,
        token: sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION)
      }
    }).delete(`/productos/${id}`);
  }

}

export default new ProductoDataService();