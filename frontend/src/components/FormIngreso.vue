<template>

    <v-card style="margin-top: 50px;margin-bottom: 15px;" class="ingreso">
        <v-card-title class="headline black text-center" primary-title>
            Ingreso
        </v-card-title>
        <v-card-text class="pa-5">
            <v-form ref="form">
                <v-text-field v-model="usuario" label="Usuario" :rules="rules"></v-text-field>
                <v-text-field type="password" v-model="clave" label="Clave" :rules="rules"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions class="pa-5">
            <v-btn variant="outlined" type="submit" color="primary" @click="validar_formulario()">Ingresar</v-btn>
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

export default {
  name: "ingreso-form",
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
    usuario: "",
    clave: "",
    };
  },
  methods: {
    ingresar() {
        var datos = {
          nombre : this.usuario,
          clave: this.clave,
        };
        IngresoDataService.acceso(datos)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if(response.data.token != null) {
            var token = response.data.token;
            sessionStorage.setItem(process.env.VUE_APP_NOMBRE_SESION, token);
            this.$router.push({ path: "/productos" });           
          } else {
            this.snackbar = true;
            this.texto = "Los datos son inválidos";
          }
        })
        .catch((e) => {
          console.log(e);
        }); 
    },
    async validar_formulario () {
        const { valid } = await this.$refs.form.validate();

        if (valid) {
            this.ingresar();
        }
      },
  },
  mounted() {
  },
};
</script>