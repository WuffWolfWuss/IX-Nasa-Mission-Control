const launches = new Map();

let lastedFlightNumber = 1000;

const launch = {
  flightNumber: 1000,
  mission: "Kepler Explore",
  rocket: "Falcon 9",
  launchDate: new Date("November 21, 2023"),
  target: "Kelper-101 c",
  customers: ["NASA", "Europe"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function findLaunchById(id) {
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  lastedFlightNumber++; //launch id provide by server
  launches.set(
    lastedFlightNumber,
    Object.assign(launch, {
      upcoming: true,
      success: true,
      customers: ["SpaceY", "ME"],
      flightNumber: lastedFlightNumber,
    })
  );
}

function abortLaunch(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  findLaunchById,
  abortLaunch,
};
