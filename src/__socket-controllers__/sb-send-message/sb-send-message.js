const makeSBSendMessage = ({ sendMessage }) => {
  const SBSendMessage = async ({ text, senderId, roomId }) => {
    LOG.core("CONTROLLER: SBSendMessage Called");

    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object
      // console.log(text);
      const { ok, statusCode, ...messageSent } = await sendMessage({
        roomId,
        senderId,
        text,
      });
      return {
        ok,
        ...messageSent,
      };
    } catch (err) {
      return {
        ok: false,
        data: {
          error: err.message,
        },
      };
    }
  };

  return SBSendMessage;
};

module.exports = makeSBSendMessage;
