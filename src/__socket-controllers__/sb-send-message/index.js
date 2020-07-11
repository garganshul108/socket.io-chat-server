const makeSBSendMessage = require("./sb-send-message");
const sendMessage = require("../../__usecases__/send-message");

const SBSendMessage = makeSBSendMessage({ sendMessage });

module.exports = SBSendMessage;
