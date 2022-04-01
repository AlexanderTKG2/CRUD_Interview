const express = require("express");
const app = express();
const api = require("./api/api");

const bodyParser = require("body-parser");
app.disable("x-powered-by"); //se oculta informacion del servidor
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", api);
app.use("/api", api);

const PORT = process.env.PORT || 57132;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

