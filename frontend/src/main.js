import { createApp } from "vue"
import App from "./App.vue"
import { loadFonts } from "./plugins/webfontloader"
import * as VueRouter from "vue-router";

import { createVuetify } from "vuetify"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const customDarkTheme = {
  dark: true,
  colors: {
    background: "#15202b",
    surface: "#15202b",
    primary: "#3f51b5",
    secondary: "#03dac6",
    error: "#f44336",
    info: "#2196F3",
    success: "#4caf50",
    warning: "#fb8c00",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "customDarkTheme",
    themes: {
      customDarkTheme,
    },
  },
})

const routes = [
  {
    path: "/",
    alias: "/",
    name: "ingreso",
    component: () => import("./components/FormIngreso")
  },
  {
    path: "/proveedores",
    alias: "/proveedores",
    name: "proveedores",
    meta: { layout: "LayoutAdmin" },
    component: () => import("./components/GestorProveedores")
  },
  {
    path: "/productos",
    alias: "/productos",
    name: "productos",
    meta: { layout: "LayoutAdmin" },
    component: () => import("./components/GestorProductos")
  },
  {
    path: "/usuarios",
    alias: "/usuarios",
    name: "usuarios",
    meta: { layout: "LayoutAdmin" },
    component: () => import("./components/GestorUsuarios")
  },
  {
    path: "/cambiarUsuario",
    alias: "/cambiarUsuario",
    name: "cambiarUsuario",
    meta: { layout: "LayoutAdmin" },
    component: () => import("./components/FormCambiarUsuario")
  },
  {
    path: "/cambiarClave",
    alias: "/cambiarClave",
    name: "cambiarClave",
    meta: { layout: "LayoutAdmin" },
    component: () => import("./components/FormCambiarClave")
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

import IngresoDataService from "./services/IngresoDataService";

router.beforeEach((to, from, next) => {
  var ir = to.path;
  var paginas_visitante = ["/"];
  var paginas_usuario = ["/productos","/proveedores","/cambiarUsuario","/cambiarClave"];
  var paginas_admin = ["/usuarios"];

  var token = sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION);

  var datos = {
    token : token
  };

  if(to.name == "ingreso" && token != null) {
    next({ name: "productos" });
  }
  
  IngresoDataService.validar_acceso(datos)
  .then((response) => {
    console.log(response);
    console.log(response.data);
    
    if(response.data.token != null) {
      var tipo_usuario = response.data.token.tipo;
      if(tipo_usuario == "Administrador") {
        if(paginas_usuario.includes(ir) || paginas_admin.includes(ir)) {
          next();
        } else {
          next({ name: "ingreso" });
        }
      }
      else if(tipo_usuario = "usuario") {
        if(paginas_usuario.includes(ir)) {
          next();
        } else {
          next({ name: "ingreso" });
        }
      } else {
        next({ name: "ingreso" });
      }
    } else {
      next({ name: "ingreso" });
    }
    
  })
  .catch((e) => {
    console.log(e);

    if (to.name !== "ingreso") {
      next({ name: "ingreso" });
    } else {
      next();
    }
    
  }); 

});

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueSweetalert2)
  .mount("#app")
