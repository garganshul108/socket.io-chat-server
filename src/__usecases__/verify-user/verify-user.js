const makeVerifyUser = ({ userDb }) => {
  const verifyUser = async ({ username, password }) => {
    LOG.core("USECASE: verifyUser called");

    if (!username || !password) {
      throw new Error("Username and Password for the user must be provided.");
    }

    const existingUser = await userDb.findByUsername({ username });

    // LOG.core(existingUser);
    if (!existingUser) {
      throw new Error(`No user with ${username} exists.`);
    }

    // LOG.core(password, existingUser);
    if (password === existingUser.password) {
      return {
        ok: true,
        message: `User Verified.`,
        data: {},
      };
    } else {
      return {
        ok: false,
        statusCode: 403,
        error: `Invalid Username Password combination.`,
      };
    }
  };
  return verifyUser;
};

module.exports = makeVerifyUser;
