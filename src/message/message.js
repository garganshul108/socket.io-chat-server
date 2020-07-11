const buildMakeMessage = ({ textSanitizer }) => {
  const makeMessage = ({ text, roomId, timestamp, senderId }) => {
    if (!text) {
      throw new Error("Message must have some text.");
    }

    if (!roomId) {
      throw new Error("Message must have a room id.");
    }

    if (!senderId) {
      throw new Error("Message must have a sender username");
    }

    timestamp = timestamp || new Date().toUTCString();
    text = textSanitizer(text);

    const deletedText = "**This message has been deleted**";

    return Object.freeze({
      getSenderId: () => senderId,
      getRoomId: () => roomId,
      getTimestamp: () => timestamp,
      getText: () => text,
      isDeleted: () => text === deletedText,
      delete: () => {
        text = deletedText;
      },
      makeObj: () => {
        return {
          text,
          roomId,
          senderId,
          timestamp,
        };
      },
    });
  };

  return makeMessage;
};

module.exports = buildMakeMessage;
