const http = require("http");
const app = require("./app");

const { loadedPLanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await loadedPLanetsData(); //loaded planet data before run server

  server.listen(PORT, () => {
    console.log(`Listen to port ${PORT}...`);
  });
}

startServer();
