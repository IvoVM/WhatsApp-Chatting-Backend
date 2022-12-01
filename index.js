const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
  },
});
const path = require("path");
const cors = require("cors");

//Settings;
app.use(cors());
app.set("port", process.env.PORT || 3000);
const port = app.get("port");
app.use(express.json());

//Static Files
app.use(express.static(path.join(__dirname, "src")));

//code

require("./src/js/websockets/socket")(io);

require("./src/js/databases/mongoose");

app.use(require("./src/js/main.js"));

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
