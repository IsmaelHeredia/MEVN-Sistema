<template>

    <v-card class="mx-auto text-center" style="margin-top: 15px;margin-bottom: 15px;" tile>
      <v-card-title>Proveedores</v-card-title>

      <v-table>
        <thead>
          <tr>
            <th class="text-center">
              Nombre
            </th>
            <th class="text-center">
              Dirección
            </th>
            <th class="text-center">
              Teléfono
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
            v-for="proveedor in proveedores"
            :key="proveedor.nombre"
          >
            <td>{{ proveedor.nombre }}</td>
            <td>{{ proveedor.direccion }}</td>
            <td>{{ proveedor.telefono }}</td>
            <td>{{ proveedor.fecha_registro }}</td>
            <td>
              <v-icon small @click="editarProveedor(proveedor._id)">mdi-pencil</v-icon>
              <v-icon small @click="borrarProveedor(proveedor._id)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

    </v-card>

    <div class="col-12 text-center">
      <v-btn variant="outlined" @click="nuevoProveedor()" color="primary">Agregar proveedor</v-btn>
    </div>

    <v-dialog
          v-model="dialogProveedor"
          width="500">
          <v-card>
              <v-card-title class="headline black" primary-title>
                Proveedor
              </v-card-title>
              <v-card-text class="pa-5">
                  <v-form ref="form">
                      <v-text-field v-model="nombre" label="Nombre" :rules="rules"></v-text-field>
                      <v-text-field v-model="direccion" label="Dirección" :rules="rules"></v-text-field>
                      <v-text-field v-model="telefono" label="Teléfono" :rules="rules"></v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions class="pa-5">
                  <v-btn variant="outlined" type="submit" @click="validar_formulario()" color="primary">Guardar</v-btn>
                  <v-btn variant="outlined" @click="dialogProveedor = false">Cerrar</v-btn>
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

  import ProveedorDataService from "../services/ProveedorDataService";
  
  export default {
    name: "proveedores-list",
    data() {
      return {
        proveedores: [],
        texto:"",
        snackbar:false,
        dialogProveedor: false,
        rules: [
        value => {
          if (value) return true
          return "El campo es requerido"
        },
      ],
        id: "",
        nombre: "",
        direccion: "",
        telefono: "",
      };
    },
    methods: {
      listarProveedores() {
        ProveedorDataService.getAll()
          .then((response) => {
            console.log(response);
            this.proveedores = response.data.proveedores;
            console.log(response.data.proveedores);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      actualizarLista() {
        this.listarProveedores();
      },
      nuevoProveedor() {
        this.id = "";
        this.nombre = "";
        this.direccion = "";
        this.telefono = "";
        this.dialogProveedor = true;
      },
      async validar_formulario () {
        const { valid } = await this.$refs.form.validate();

        if (valid) {
          if(this.id == "") {
            this.guardarProveedor();
          } else {
            this.guardarEdicionProveedor();
          }
        }
      },
      guardarProveedor() {
        var datos = {
          nombre : this.nombre,
          direccion: this.direccion,
          telefono: this.telefono
        };
        ProveedorDataService.create(datos)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.dialogProveedor = false;
          this.snackbar = true;
          this.texto = "El proveedor fue creado";
          this.actualizarLista();
        })
        .catch((e) => {
          console.log(e);
        });          
      },
      editarProveedor(id) {
        ProveedorDataService.get(id)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          var proveedor = response.data.proveedor;
          this.id = proveedor._id;
          this.nombre = proveedor.nombre;
          this.direccion = proveedor.direccion;
          this.telefono = proveedor.telefono;
          this.dialogProveedor = true;
        })
        .catch((e) => {
          console.log(e);
        });
      },
      guardarEdicionProveedor() {
        var datos = {
          nombre : this.nombre,
          direccion: this.direccion,
          telefono: this.telefono
        };
        ProveedorDataService.update(this.id, datos)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.dialogProveedor = false;
          this.snackbar = true;
          this.texto = "El proveedor fue actualizado";
          this.actualizarLista();
        })
        .catch((e) => {
          console.log(e);
        });
      },
      borrarProveedor(id) {
        this.$swal.fire({
          title: "Desea borrar el proveedor ?",
          showDenyButton: true,
          confirmButtonText: "Borrar",
          denyButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              ProveedorDataService.delete(id)
              .then(() => {
                this.snackbar = true;
                this.texto = "El proveedor fue borrado";
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
      this.listarProveedores();
    },
  };
  </script>