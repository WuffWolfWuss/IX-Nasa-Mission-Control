const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

//const launches = new Map();

const launch = {
  flightNumber: 1000,
  mission: "Kepler Explore",
  rocket: "Falcon 9",
  launchDate: new Date("November 21, 2023"),
  target: "Kelper-101 a",
  customers: ["NASA", "Europe"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function findLaunchById(id) {
  return await launches.findOne({ flightNumber: id });
}

async function getLastedFlightNumber() {
  const lastest = await launches.findOne({}).sort("-flightNumber");
  return lastest.flightNumber || 100;
}

async function getAllLaunches() {
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveLaunch(launch) {
  await launches.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

async function addNewLaunch(launch) {
  const newFlightNumber = (await getLastedFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    upcoming: true,
    success: true,
    customers: ["SpaceY", "ME"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function abortLaunch(id) {
  const aborted = await launches.updateOne(
    {
      flightNumber: id,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  findLaunchById,
  abortLaunch,
};
