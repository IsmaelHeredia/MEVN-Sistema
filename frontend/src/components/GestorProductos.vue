<template>

    <v-card class="mx-auto text-center" style="margin-top: 15px;margin-bottom: 15px;" tile>
      <v-card-title>Productos</v-card-title>

      <v-table>
        <thead>
          <tr>
            <th class="text-center">
              Nombre
            </th>
            <th class="text-center">
              Descripción
            </th>
            <th class="text-center">
              Precio
            </th>
            <th class="text-center">
              Proveedor
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
            v-for="producto in productos"
            :key="producto.nombre"
          >
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.proveedor }}</td>
            <td>{{ producto.fecha_registro }}</td>
            <td>
              <v-icon small @click="editarProducto(producto._id)">mdi-pencil</v-icon>
              <v-icon small @click="borrarProducto(producto._id)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </v-table>

    </v-card>

    <div class="col-12 text-center">
      <v-btn variant="outlined" @click="nuevoProducto()" color="primary">Agregar producto</v-btn>
    </div>

    <v-dialog
          v-model="dialogProducto"
          width="500">
          <v-card>
              <v-card-title class="headline black" primary-title>
                Producto
              </v-card-title>
              <v-card-text class="pa-5">
                  <v-form ref="form">
                      <v-text-field v-model="nombre" label="Nombre" :rules="rules"></v-text-field>
                      <v-text-field v-model="descripcion" label="Descripción" :rules="rules"></v-text-field>
                      <v-text-field v-model="precio" label="Precio" :rules="rules"></v-text-field>
                      <v-select
                        v-model="proveedor"
                        :items="proveedores"
                        item-title="nombre"
                        item-value="nombre"
                        label="Seleccione proveedor"
                    ></v-select>
                  </v-form>
              </v-card-text>
              <v-card-actions class="pa-5">
                  <v-btn variant="outlined" type="submit" @click="validar_formulario()" color="primary">Guardar</v-btn>
                  <v-btn variant="outlined" @click="dialogProducto = false">Cerrar</v-btn>
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

  import ProductoDataService from "../services/ProductoDataService";
  import ProveedorDataService from "../services/ProveedorDataService";

  export default {
    name: "productos-list",
    data() {
      return {
        productos: [],
        proveedores: [],
        texto:"",
        snackbar:false,
        dialogProducto: false,
        rules: [
        value => {
          if (value) return true
          return "El campo es requerido"
        },
      ],
        id: "",
        nombre: "",
        descripcion: "",
        precio: "",
        proveedor: "",
      };
    },
    methods: {
      listarProductos() {
        ProductoDataService.getAll()
          .then((response) => {
            console.log(response);
            this.productos = response.data.productos;
            console.log(response.data.productos);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      actualizarLista() {
        this.listarProductos();
      },
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
      nuevoProducto() {
        this.id = "";
        this.nombre = "";
        this.descripcion = "";
        this.precio = "";
        this.proveedor = "";
        this.dialogProducto = true;
      },
      async validar_formulario () {
        const { valid } = await this.$refs.form.validate();

        if (valid) {
          if(this.id == "") {
            this.guardarProducto();
          } else {
            this.guardarEdicionProducto();
          }
        }
      },
      guardarProducto() {
        var datos = {
          nombre : this.nombre,
          descripcion: this.descripcion,
          precio: this.precio,
          proveedor: this.proveedor
        };
        ProductoDataService.create(datos)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.dialogProducto = false;
          this.snackbar = true;
          this.texto = "El producto fue creado";
          this.actualizarLista();
        })
        .catch((e) => {
          console.log(e);
        });          
      },
      editarProducto(id) {
        ProductoDataService.get(id)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          var producto = response.data.producto;
          this.id = producto._id;
          this.nombre = producto.nombre;
          this.descripcion = producto.descripcion;
          this.precio = producto.precio;
          this.proveedor = producto.proveedor;
          this.dialogProducto = true;
        })
        .catch((e) => {
          console.log(e);
        });
      },
      guardarEdicionProducto() {
        var datos = {
          nombre : this.nombre,
          descripcion: this.descripcion,
          precio: this.precio,
          proveedor: this.proveedor
        };
        ProductoDataService.update(this.id, datos)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          this.dialogProducto = false;
          this.snackbar = true;
          this.texto = "El producto fue actualizado";
          this.actualizarLista();
        })
        .catch((e) => {
          console.log(e);
        });
      },
      borrarProducto(id) {
        this.$swal.fire({
          title: "Desea borrar el producto ?",
          showDenyButton: true,
          confirmButtonText: "Borrar",
          denyButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              ProductoDataService.delete(id)
              .then(() => {
                this.snackbar = true;
                this.texto = "El producto fue borrado";
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
      this.listarProductos();
      this.listarProveedores();
    },
  };
  </script>