const buildMakeRoom = require("./room");
const textSanitizer = (text) => text;
const makeRoom = buildMakeRoom({ textSanitizer });

module.exports = makeRoom;
