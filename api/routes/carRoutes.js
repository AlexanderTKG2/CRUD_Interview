const router = require("express").Router();
const CarService = require("../services/CarService");
const process = require("process");
const _carService = new CarService(
  "file",
  `${process.cwd()}/api/data/MOCK_DATA.csv`
);

router.get("/", async (req, res) => {
  try {
    const cars = await _carService.getAllCars();
    res.status(200).json({ status: "success", cars });
  } catch (err) {
    res.status(500).json({ status: "error: " + err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const cars = await _carService.getAllCars();
    res.status(200).json({ status: "success", cars });
  } catch (err) {
    res.status(500).json({ status: "error: " + err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cars = await _carService.getAllCars();
    const id = Number(req.params.id);
    const car = cars.filter((item) => Number(item.id) === id)[0];
    res.status(200).json({ status: "success", car });
  } catch (err) {
    res.status(500).json({ status: "error: " + err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const newCar = await _carService.createCar(req.body);
    res.status(201).json({ status: "success", newCar });
  } catch (error) {
    res.status(500).json({ status: "error: " + err.message });
  }
});

router.put("/:id", (req, res) => {
  res.status(200).json({ "status": "unimplemented" });
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await _carService.deleteCar(id);
    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error: " + err.message });
  }
});

module.exports = router;
