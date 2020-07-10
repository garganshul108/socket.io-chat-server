const makeMessage = require("../../message");
const makeRoom = require("../../room");

const makeSendMessage = ({ roomDb }) => {
  const sendMessage = async ({ roomId, senderId, text }) => {
    LOG.core("USECASE: sendMessage called");

    const existingRoom = await roomDb.findByTitle({ title: roomId });
    if (!existingRoom) {
      return {
        ok: false,
        message: `No such room exists.`,
      };
    }
    const room = makeRoom({ ...existingRoom });
    const message = makeMessage({ roomId, senderId, text });
    room.addMessage(message);
    await roomDb.addMessageToRoom({
      title: roomId,
      message: {
        text: message.getText(),
        timestamp: message.getTimestamp(),
        senderId: message.getSenderId(),
        roomId: message.getRoomId(),
      },
    });

    return {
      ok: true,
      message: `Message sent successfully.`,
      data: {
        text: message.getText(),
        timestamp: message.getTimestamp(),
        senderId: message.getSenderId(),
        roomId: message.getRoomId(),
      },
    };
  };

  return sendMessage;
};

module.exports = makeSendMessage;
