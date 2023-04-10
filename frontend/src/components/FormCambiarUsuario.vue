<template>

    <v-card style="margin-top: 15px;margin-bottom: 15px;">
        <v-card-title class="headline black" primary-title>
            Cambiar usuario
        </v-card-title>
        <v-card-text class="pa-5">
            <v-form ref="form">
                <v-text-field v-model="usuario" label="Usuario" readonly="readonly"></v-text-field>
                <v-text-field v-model="nuevo_usuario" label="Nuevo usuario" :rules="rules"></v-text-field>
                <v-text-field type="password" v-model="clave" label="Clave" :rules="rules"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions class="pa-5">
            <v-btn variant="outlined" type="submit" @click="validar_formulario()" color="primary">Guardar</v-btn>
        </v-card-actions>
    </v-card>

    <div class="text-center">

        <v-snackbar
            v-model="snackbar"
            multi-line
        >
            {{ texto }}

            <template v-slot:actions>
            <v-btn
                color="red"
                variant="text"
                @click="snackbar = false"
            >
                Cerrar
            </v-btn>
            </template>
        </v-snackbar>

    </div>

</template>

<script>

import IngresoDataService from "../services/IngresoDataService";
import CuentaDataService from "../services/CuentaDataService";

export default {
  name: "cambiar-usuario-form",
  data() {
    return {
      texto:"",
      snackbar:false,
      rules: [
      value => {
        if (value) return true
        return "El campo es requerido"
      },
    ],
    id:"",
    usuario: "",
    nuevo_usuario: "",
    clave: "",
    };
  },
  methods: {
    cargarUsuario() {

        var token = sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION);

        var datos = {
            token : token
        };

        IngresoDataService.validar_acceso(datos)
        .then((response) => {
            console.log(response);
            console.log(response.data);        
            this.id = response.data.token.id;
            this.usuario = response.data.token.usuario;
        })
        .catch((e) => {
            console.log(e);
        }); 
    },
    async validar_formulario () {
        const { valid } = await this.$refs.form.validate();

        if (valid) {
            this.cambiarUsuario();
        }
    },
    cambiarUsuario() {

        var token = sessionStorage.getItem(process.env.VUE_APP_NOMBRE_SESION);

        var datos = {
            id : this.id,
            nombre: this.nuevo_usuario
        };

        var datos_control = {
          nombre : this.usuario,
          clave: this.clave,
        };

        IngresoDataService.acceso(datos_control)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if(response.data.token != null) {
            
            CuentaDataService.cambiarUsuario(datos)
            .then((response) => {
                console.log(response);
                console.log(response.data);
                if(response.data.estado == "200") {
                    sessionStorage.removeItem(process.env.VUE_APP_NOMBRE_SESION, "");
                    this.$router.push({ path: "/" });  
                }
            })
            .catch((e) => {
                console.log(e);
            });

          } else {
            this.snackbar = true;
            this.texto = "Los datos de ingreso son inválidos";
          }
        })
        .catch((e) => {
          console.log(e);
        });

    }
  },
  mounted() {
    this.cargarUsuario();
  },
};
</script>