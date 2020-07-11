const makeSBSendMessage = ({ sendMessage }) => {
  const SBSendMessage = async ({ text, senderId, roomId }) => {
    LOG.core("CONTROLLER: SBSendMessage Called");

    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object
      console.log(text);
      const messageSent = await sendMessage({ roomId, senderId, text });
      return {
        ok: true,
        data: {
          ...messageSent,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        ok: false,
        data: {
          ...err,
        },
      };
    }
  };

  return SBSendMessage;
};

module.exports = makeSBSendMessage;
