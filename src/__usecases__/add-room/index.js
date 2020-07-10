const makeAddRoom = require("./add-room");

const userDb = require("../../__data-access__/user");
const roomDb = require("../../__data-access__/room");

const addRoom = makeAddRoom({ userDb, roomDb });

module.exports = addRoom;
