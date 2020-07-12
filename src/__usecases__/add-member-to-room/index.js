const makeAddMemberToRoom = require("./add-member-to-room");

const roomDb = require("../../__data-access__/room");
const userDb = require("../../__data-access__/user");

const addMemberToRoom = makeAddMemberToRoom({ roomDb, userDb });

module.exports = addMemberToRoom;
