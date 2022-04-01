const fs = require("fs");
const { parse } = require("csv-parse");
const { Mapper } = require("./MapperService");
var json2csv = require("json2csv").parse;
const mapper = new Mapper();

class CarService {
  constructor(type, dataSource) {
    this.type = type;
    this.dataSource = dataSource;
  }

  getAllCars() {
    return new Promise((resolve, reject) => {
      try {
        let data = [];
        fs.readFile(this.dataSource, function (err, fileData) {
          parse(fileData, { columns: false, trim: true }, function (err, rows) {
            data = mapper.mapCarCsvToJsonArray(rows);
            resolve(data);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async createCar(carData) {
    const cars = await this.getAllCars();
    const id = cars.length + 1;
    const data = { id: id, ...carData };
    const path = this.dataSource;
    return new Promise((resolve, reject) => {
      fs.stat(this.dataSource, function (err, stat) {
        if (err == null) {
          let rows = json2csv(data, { header: false }) + "\r\n";

          fs.appendFile(path, rows, function (err) {
            if (err) {
              throw err;
            }
            resolve(data);
          });
        }
      });
    });
  }

  async deleteCar(id) {
    const cars = await this.getAllCars();
    const data = cars.filter((item) => Number(item.id) != id);
    let rows = json2csv(data, { header: false }) + "\r\n";

    fs.writeFile(this.dataSource, rows, function (err) {
      if (err) {
        throw err;
      }
    });

  }
}

module.exports = CarService;
