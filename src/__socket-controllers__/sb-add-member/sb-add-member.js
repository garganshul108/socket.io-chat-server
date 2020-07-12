const makeSBAddMember = ({ addMember }) => {
  const SBAddMember = async ({ admin, member, roomId }) => {
    LOG.core("CONTROLLER: SBAddMember Called");

    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object
      // console.log(text);
      const { ok, statusCode, ...messageSent } = await addMember({
        roomId,
        admin,
        member,
      });
      return {
        ok,
        data: {
          ...messageSent,
        },
      };
    } catch (err) {
      // console.log(err);
      return {
        ok: false,
        data: {
          error: err.message,
        },
      };
    }
  };

  return SBAddMember;
};

module.exports = makeSBAddMember;
