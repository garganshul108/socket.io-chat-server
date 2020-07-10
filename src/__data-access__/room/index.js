const makeDb = require("../../../db");
const makeRoomDb = require("./room-db");

const roomDb = makeRoomDb({ makeDb });

module.exports = roomDb;
