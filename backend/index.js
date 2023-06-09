const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

var jwt = require("jsonwebtoken");

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Usuario = require("./modelos/usuario.model");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
mongoose.Promise = global.Promise;

db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Método JsonWebToken

/*
const asegurarRutasUsuario = express.Router(); 
asegurarRutasUsuario.use((req, res, next) => {
  var token = "";

  if(req.headers.authorization != null) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    jwt.verify(token, process.env.CLAVE_JWT, (err, decoded) => {      
      if (err) {
        return res.status(400).json({ estado:400, mensaje: "Token inválida" });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    res.status(400).send({ estado:400, mensaje: "Necesita ingresar token" });
  }
});

const asegurarRutasAdministrador = express.Router(); 
asegurarRutasAdministrador.use((req, res, next) => {
  var token = "";

  if(req.headers.authorization != null) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    jwt.verify(token, process.env.CLAVE_JWT, (err, decoded) => {      
      if (err) {
        return res.status(400).json({ estado:400, mensaje: "Token inválida" });    
      } else {
        if(decoded.tipo == "Administrador") {
          req.decoded = decoded;    
          next();
        } else {
          return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
        }
      }
    });
  } else {
    res.status(400).send({ estado:400, mensaje: "Necesita ingresar token" });
  }
});
*/

// Método Passport JWT

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.CLAVE_JWT;
opts.algorithms = ["HS256"];

passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{

    var id = jwt_payload.id;

    Usuario.find({_id: id}, function (error, resultado) {
      if (error){
        return done(null, false);
      } else {
        return done(null, resultado);
      }
    });
    
}));

const asegurarRutasUsuario = express.Router(); 
asegurarRutasUsuario.use((req, res, next) => {
  passport.authenticate("jwt", {session: false}, (err, usuario, info)=>{

    if(info){ 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }

    if (err) { 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }

    if (!usuario) { 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }
    
    next();

  })(req, res, next);
});

const asegurarRutasAdministrador = express.Router(); 
asegurarRutasAdministrador.use((req, res, next) => {
  passport.authenticate("jwt", {session: false}, (err, usuario, info)=>{

    if(info){ 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }

    if (err) { 
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }

    if (usuario) { 
      var datos = JSON.parse(JSON.stringify(usuario));
      var tipo = datos[0].tipo;

      if(tipo != "Administrador") {
        return res.status(400).json({ estado:400, mensaje: "Acceso solo permitido para los administradores" });
      }
    } else {
      return res.status(400).json({ estado:400, mensaje: "Acceso denegado" });
    }
    
    next();

  })(req, res, next);
});

var instalar = require("./controladores/instalar.js");

var acceso = require("./controladores/acceso.js");

var productos = require("./controladores/productos.js");
var proveedores = require("./controladores/proveedores.js");
var usuarios = require("./controladores/usuarios.js");
var tipos_usuarios = require("./controladores/tiposusuarios.js");
var cuenta = require("./controladores/cuenta.js");

app.use("/instalar", instalar);

app.use("/acceso", acceso);

app.use("/productos", asegurarRutasUsuario, productos);
app.use("/proveedores", asegurarRutasUsuario, proveedores);
app.use("/usuarios", asegurarRutasAdministrador, usuarios);
app.use("/tiposusuarios", asegurarRutasAdministrador, tipos_usuarios);
app.use("/cuenta", asegurarRutasUsuario, cuenta);

var puerto_servidor = process.env.PUERTO_SERVIDOR;

app.listen(puerto_servidor, () => {
 console.log("El servidor está inicializado en el puerto " + puerto_servidor);
});