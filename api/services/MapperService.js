class Mapper {
    constructor() {}

    mapCarCsvToJsonArray(csvRowsArray) {
        return csvRowsArray.map(row => {
            return {
                "id": row[0],
                "vin": row[1],
                "model": row[2],
                "make": row[3],
                "color": row[4],
                "state": row[5]
            };
        });
    }
}

module.exports = { Mapper };