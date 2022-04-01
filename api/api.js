const router = require("express").Router();
const carRouter = require("./routes/carRoutes");

router.use("/cars", carRouter);

router.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to the CRUD API</h1><br /><h4>CRUD running on <em>127.0.0.1:${process.env.PORT || 57132}/api/cars/</em></h4>`);
});

module.exports = router;
