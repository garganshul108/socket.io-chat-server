const makeSBAddMember = ({ addMember }) => {
  const SBAddMember = async ({ admin, member, roomId }) => {
    LOG.core("CONTROLLER: SBAddMember Called");

    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object
      // console.log(text);
      const messageSent = await addMember({ roomId, admin, member });
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

  return SBAddMember;
};

module.exports = makeSBAddMember;
