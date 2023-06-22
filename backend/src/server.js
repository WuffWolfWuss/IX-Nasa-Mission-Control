const mongoose = require("mongoose");

const http = require("http");
const app = require("./app");

const { loadedPLanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 5000;

const MONGO_URL =
  "mongodb+srv://<username>:<password>@cluster0.qxzxpg4.mongodb.net/NASA?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Connection ready.");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadedPLanetsData(); //loaded planet data before run server

  server.listen(PORT, () => {
    console.log(`Listen to port ${PORT}...`);
  });
}

startServer();
