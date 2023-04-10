<template>

    <v-card class="mx-auto text-center" style="margin-top: 15px;margin-bottom: 15px;" tile>
      <v-card-title>Usuarios</v-card-title>

      <v-table>
        <thead>
          <tr>
            <th class="text-center">
              Nombre
            </th>
            <th class="text-center">
              Tipo
            </th>
            <th class="text-center">
              Fecha registro
            </th>
            <th class="text-center">
              Opción
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="usuario in usuarios"
            :key="usuario.nombre"
          >
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.tipo }}</td>
            <td>{{ usuario.fecha_registro }}</td>
            <td>
              <v-icon small @click="editarUsuario(usuario._id)">mdi-pencil</v-icon>
              <v-icon small @click="borrarUsuario(usuario._id)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

    </v-card>

    <div class="col-12 text-center">
      <v-btn variant="outlined" @click="nuevoUsuario()" color="primary">Agregar usuario</v-btn>
    </div>

    <v-dialog
          v-model="dialogUsuario"
          width="500">
          <v-card>
              <v-card-title class="headline black" primary-title>
                Usuario
              </v-card-title>
              <v-card-text class="pa-5">
                  <v-form ref="form">
                      <v-text-field v-model="nombre" label="Nombre" :rules="rules"></v-text-field>
                      <v-text-field type="password" v-model="clave" label="Clave" :rules="rules"></v-text-field>
                      <v-select
                        v-model="tipo"
                        :items="tipos_usuarios"
                        item-title="nombre"
                        item-value="nombre"
                        label="Seleccione tipo de usuario"
                    ></v-select>
                  </v-form>
              </v-card-text>
              <v-card-actions class="pa-5">
                  <v-btn variant="outlined" type="submit" @click="validar_formulario()" color="primary">Guardar</v-btn>
                  <v-btn variant="outlined" @click="dialogUsuario = false">Cerrar</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>

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

  import UsuarioDataService from "../services/UsuarioDataService";
  import TipoUsuarioDataService from "../services/TipoUsuarioDataService";

  export default {
    name: "usuarios-list",
    data() {
      return {
        usuarios: [],
        tipos_usuarios: [],
        texto:"",
        snackbar:false,
        dialogUsuario: false,
        rules: [
        value => {
          if (value) return true
          return "El campo es requerido"
        },
      ],
        id: "",
        nombre: "",
        clave: "",
        tipo: "",
      };
    },
    methods: {
      listarUsuarios() {
        UsuarioDataService.getAll()
          .then((response) => {
            console.log(response);
            this.usuarios = response.data.usuarios;
            console.log(response.data.usuarios);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      actualizarLista() {
        this.listarUsuarios();
      },
      listarTiposUsuarios() {
        TipoUsuarioDataService.getAll()
          .then((response) => {
            console.log(response);
            this.tipos_usuarios = response.data.tiposusuarios;
            console.log(response.data.tiposusuarios);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      nuevoUsuario() {
        this.id = "";
        this.nombre = "";
        this.clave = "";
        this.tipo = "";
        this.dialogUsuario = true;
      },
      async validar_formulario () {
        const { valid } = await this.$refs.form.validate();

        if (valid) {
          if(this.id == "") {
            this.guardarUsuario();
          } else {
            this.guardarEdicionUsuario();
          }
        }
      },
      guardarUsuario() {
        var datos = {
          nombre : this.nombre,
          clave: this.clave,
          tipo: this.tipo
        };
        UsuarioDataService.create(datos)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.dialogUsuario = false;
          this.snackbar = true;
          this.texto = "El usuario fue creado";
          this.actualizarLista();
        })
        .catch((e) => {
          console.log(e);
        });          
      },
      editarUsuario(id) {
        UsuarioDataService.get(id)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          var usuario = response.data.usuario;
          this.id = usuario._id;
          this.nombre = usuario.nombre;
          this.clave = "1234";
          this.tipo = usuario.tipo;
          this.dialogUsuario = true;
        })
        .catch((e) => {
          console.log(e);
        });
      },
      guardarEdicionUsuario() {
        var datos = {
          tipo: this.tipo
        };
        UsuarioDataService.update(this.id, datos)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.dialogUsuario = false;
          this.snackbar = true;
          this.texto = "El usuario fue actualizado";
          this.actualizarLista();
        })
        .catch((e) => {
          console.log(e);
        });
      },
      borrarUsuario(id) {
        this.$swal.fire({
          title: "Desea borrar el usuario ?",
          showDenyButton: true,
          confirmButtonText: "Borrar",
          denyButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              UsuarioDataService.delete(id)
              .then(() => {
                this.snackbar = true;
                this.texto = "El usuario fue borrado";
                this.actualizarLista();
              })
              .catch((e) => {
                console.log(e);
              });
            }
        })
      }
    },
    mounted() {
      this.listarUsuarios();
      this.listarTiposUsuarios();
    },
  };
  </script>