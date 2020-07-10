const buildMakeMessage = require("./message");

const textSanitizer = (text) => text;

const makeMessage = buildMakeMessage({ textSanitizer });

module.exports = makeMessage;
