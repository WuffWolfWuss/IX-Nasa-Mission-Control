const {
  getAllLaunches,
  addNewLaunch,
  findLaunchById,
  abortLaunch,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

const httpAndNewLaunch = (req, res) => {
  const launchData = req.body;
  if (
    !launchData ||
    !launchData.mission ||
    !launchData.rocket ||
    !launchData.launchDate ||
    !launchData.target
  ) {
    return res.status(400).json({ error: "invalid/missing property" });
  }

  launchData.launchDate = new Date(launchData.launchDate);
  //launchData.launchDate.toString() === "Invalid Date"
  if (isNaN(launchData.launchDate)) {
    return res.status(400).json({ error: "invalid date" });
  }

  addNewLaunch(launchData);
  return res.status(201).json(launchData);
};

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  //if not exist
  if (!findLaunchById(launchId)) {
    return res.status(404).json({
      error: "Launch not exist.",
    });
  }

  const aborted = abortLaunch(launchId);
  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAndNewLaunch, httpAbortLaunch };
