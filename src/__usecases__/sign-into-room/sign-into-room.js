const makeSignIntoRoom = ({ roomDb }) => {
  const signIntoRoom = async ({ title, member }) => {
    LOG.core("USECASE: signIntoRoom called.");
    const existing = await roomDb.findByTitle({ title });
    if (!existing) {
      console.log(`No room with title as ${title} exists.`);
      return {
        ok: false,
        message: `No room with title as ${title} exists.`,
      };
    }

    if (!existing.members.includes(member)) {
      return {
        ok: false,
        statusCode: 403,
        message: `Not an autorised member.`,
      };
    }

    return {
      ok: true,
      message: "Sign into room successfull.",
      body: { ...existing },
    };
  };

  return signIntoRoom;
};

module.exports = makeSignIntoRoom;
