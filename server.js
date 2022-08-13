//TODO setup:
//jsonwebtoken
//pg

const express = require("express");
const exphbs = require("express-handlebars");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const secretKey = "Shhhh";

const PORT = 3000;

const app = express();

app.listen(PORT, () =>
  console.log("Servidor encendido, escuchando puerto: ", PORT)
);

//Integrar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Directorio publico
app.use(express.static(__dirname + "/public"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

//Middleware
app.use(
  expressFileUpload({
    limits: 5000000,
    abortOnLimit: true,
    responseOnLimit: "El tamaño de la imagen supera el limite permitido",
  })
);

//motor de plantillas
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/mainLayout`,
    partialsDir: `${__dirname}/views/partials/`,
  })
);
app.set("view engine", "handlebars");

//Rutas
app.get("/", async (req, res) => {
  res.render("index"); //aqui como segundo argumento {helper}
});
