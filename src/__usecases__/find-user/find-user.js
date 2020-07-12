const makeFindUser = ({ userDb }) => {
  const findUser = async ({ username }) => {
    LOG.core("USECASE: findUser called");

    if (!username) {
      throw new Error("Username for the user must be provided.");
    }

    const existingUser = await userDb.findByUsername({ username });

    if (!existingUser) {
      throw new Error(`No user with ${username} exists.`);
    }

    return {
      ok: true,
      message: `User Exists.`,
      data: existingUser,
    };
  };

  return findUser;
};

module.exports = makeFindUser;
