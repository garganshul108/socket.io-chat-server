const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketIO = require("socket.io");
const helmet = require("helmet");
const corsHeaders = require("cors");
const morgan = require("morgan");

require("./global-logging-service");

const PORT = process.env.PORT || 5000;

const login = require("./routes/login");
const signup = require("./routes/signup");
const room = require("./routes/room");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(helmet());
app.use(corsHeaders());

app.use("/login", login);
app.use("/signup", signup);
app.use("/room", room);

app.get("/", (req, res) => {
  res.status(200).send("The Server is up and running");
});

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

/***
 *
 * ----------------------------------------------------
 * CHAT CONFIGRATIONS
 * ----------------------------------------------------
 *
 *  using Socket.io
 *
 */

const io = socketIO(server);

const onMessage = (payload) => console.log("Message triggered.", payload);
const onNewConnection = (payload) => console.log(`New user joined.`, payload);
const onJoiningRoom = (payload) =>
  console.log(`Joining room triggered.`, payload);
const onDisconnection = (payload) =>
  console.log(`Disconnection triggered.`, payload);

io.on("connection", (socket) => {
  onNewConnection();
  socket.on("disconnect", (payload) => onDisconnection(payload));
  socket.on("joining-room", (payload) => onJoiningRoom(payload));
  socket.on("message", (payload) => {
    onMessage(payload);
    io.emit("message", { text: payload.message, sender: payload.username });
  });
});
