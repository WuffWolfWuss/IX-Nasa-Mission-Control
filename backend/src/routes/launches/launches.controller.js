const {
  getAllLaunches,
  addNewLaunch,
  findLaunchById,
  abortLaunch,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

const httpAndNewLaunch = async (req, res) => {
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

  await addNewLaunch(launchData);
  return res.status(201).json(launchData);
};

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existed = await findLaunchById(launchId);
  //if not exist
  if (!existed) {
    return res.status(404).json({
      error: "Launch not exist.",
    });
  }

  const aborted = await abortLaunch(launchId);
  if (!aborted) {
    return res.status(400).json({ error: "Abort cancelled." });
  }
  return res.status(200).json({ ok: true });
}

module.exports = { httpGetAllLaunches, httpAndNewLaunch, httpAbortLaunch };
