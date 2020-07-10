const makeSendMessage = require("./send-message");
const roomDb = require("../../__data-access__/room");

const sendMessage = makeSendMessage({ roomDb });

module.exports = sendMessage;
