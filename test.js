const request = require("supertest");
const inspect = require("util").inspect;

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

function testOne() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      request(app)
        .get("/api/cars/all")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          console.log("Success: Got all cars");
          resolve();
        });
    }, 3000);
  });
}

function testTwo() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      const id = 1;
      request(app)
        .get("/api/cars/" + id)
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          console.log("***********************************************\n");
          console.log("Success: Got first car by ID: " + id);
          console.log(inspect(res.text));
          resolve();
        });
    }, 3000);
  });
}

function testThree() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      request(app)
        .post("/api/cars/create")
        .send({
          vin: "DEMO",
          model: "DEMO",
          make: "DEMO",
          color: "DEMO",
          state: "DEMO",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end(function (err, res) {
          if (err) throw err;
          console.log("***********************************************\n");
          console.log("Success: Created car: ");
          console.log(inspect(res.text));
          resolve();
        });
    }, 3000);
  });
}

function testFour() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      const idDelete = 1002;
      request(app)
        .delete("/api/cars/" + idDelete)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
          console.log("***********************************************\n");
          console.log("Success: Deleted car with id " + idDelete);
          console.log(inspect(res.text));
          resolve();
        });
    }, 3000);
  });
}

async function runTests() {
    await testOne();
    await testTwo();
    await testThree();
    await testFour();
}

runTests();
