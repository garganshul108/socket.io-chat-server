const makeFindRoom = require("./find-room");

const roomDb = require("../../__data-access__/room");

const findRoom = makeFindRoom({ roomDb });

module.exports = findRoom;
