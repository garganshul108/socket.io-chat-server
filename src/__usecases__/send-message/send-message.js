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
    console.log("Room exists", existingRoom);
    const room = makeRoom({ ...existingRoom });
    console.log(roomId, senderId, text);
    const message = makeMessage({ roomId, senderId, text }).makeObj();
    console.log("usercase", message);
    room.addMessage({ message });
    await roomDb.addMessageToRoom({
      title: roomId,
      message,
    });

    return {
      ok: true,
      message: `Message sent successfully.`,
      data: {
        ...message,
      },
    };
  };

  return sendMessage;
};

module.exports = makeSendMessage;
