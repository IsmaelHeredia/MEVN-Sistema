
<style>
  .ingreso {
    margin-left: 30%;
    margin-right: 30%;
    margin-top: 5%;
  }

  .contenedor {
    margin-left: 20%;
    margin-right: 20%;
  }
</style>
<template>
  <v-app>

    <LayoutAdmin v-if="this.$route.meta.layout">
      <v-app-bar app color="green" dark>
        <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>
        <v-toolbar-title>Sistema</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
          permanent
        >
          <v-list nav>
            <v-list-item prepend-icon="mdi-grid" title="Productos" value="productos" :to="{path: '/productos'}"></v-list-item>
            <v-list-item prepend-icon="mdi-grid" title="Proveedores" value="proveedores" :to="{path: '/proveedores'}"></v-list-item>
            <v-list-item prepend-icon="mdi-grid" title="Usuarios" value="usuarios" :to="{path: '/usuarios'}"></v-list-item>
            <v-list-item prepend-icon="mdi-account-circle" title="Cambiar usuario" value="cambiar_usuario" :to="{path: '/cambiarUsuario'}"></v-list-item>
            <v-list-item prepend-icon="mdi-account-circle" title="Cambiar clave" value="cambiar_clave" :to="{path: '/cambiarClave'}"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Salir" value="salir" @click="cerrar_sesion()"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      <v-main>
        <div class="pl-5 pr-5">
          <router-view />
        </div>
      </v-main>
    </LayoutAdmin>

    <LayoutBase v-else>
      <router-view />
    </LayoutBase>

  </v-app>
</template>

<script>
export default {
  name: "app",
  methods: {
    cerrar_sesion() {
      sessionStorage.removeItem(process.env.VUE_APP_NOMBRE_SESION, "");
      this.$router.push({ path: "/" });  
    }
  }
};
</script>