import http from "../http-common";

class IngresoDataService {
  acceso(data) {
    return http.post("/acceso",data);
  }

  validar_acceso(data) {
    return http.post("/acceso/validar",data);
  }
}

export default new IngresoDataService();