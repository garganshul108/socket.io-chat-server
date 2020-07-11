const makeSignIntoRoom = require("./sign-into-room");
const roomDb = require("../../__data-access__/room");

const signIntoRoom = makeSignIntoRoom({ roomDb });

module.exports = signIntoRoom;
