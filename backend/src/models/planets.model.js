const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

let habitablePlanet = [];

//filter planet that habitable
function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadedPLanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitable(data)) habitablePlanet.push(data);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        console.log(
          habitablePlanet.map((planet) => {
            const item = {
              planet: planet["kepler_name"],
              orbit: planet["koi_period"],
            };
            return item;
          })
        );
        resolve();
      });
  }); //end promise
}

function getAllPlanets() {
  return habitablePlanet;
}
module.exports = {
  loadedPLanetsData,
  getAllPlanets,
};
