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
const makeMessage = require("./src/message");
const SBSendMessage = require("./src/__socket-controllers__/sb-send-message");

const onMessage = (payload) => console.log("Message triggered.", payload);
const onNewConnection = (payload) => console.log(`New user joined.`, payload);
const onJoiningRoom = (payload) =>
  console.log(`Joining room triggered.`, payload);
const onDisconnection = (payload) =>
  console.log(`Disconnection triggered.`, payload);

io.on("connection", (socket) => {
  onNewConnection();
  socket.on("disconnect", (payload) => onDisconnection(payload));
  socket.on("joining-room", (payload) => {
    const { username, roomId } = payload;
    socket.join(roomId);
    io.to(roomId).emit(
      "message",
      makeMessage({
        text: `${username} has joined the room.`,
        senderId: "chat-bot",
        roomId,
      }).makeObj()
    );
    onJoiningRoom(payload);
  });
  socket.on("message", async (payload) => {
    const { text, username, roomId } = payload;
    console.log(text);
    const message = await SBSendMessage({
      text,
      senderId: username,
      roomId,
    });
    if (message.ok) {
      const sendingPacket = { ...message.data.data };
      console.log(sendingPacket);
      io.to(roomId).emit("message", sendingPacket);
      onMessage(payload);
    } else {
      socket.emit(
        "message",
        makeMessage({
          text: `Your message failed to deliver.`,
          senderId: "chat-bot",
          roomId,
        }).makeObj()
      );
    }
  });
});
