const makeVerifyUser = ({ userDb }) => {
  const verifyUser = async ({ username, password }) => {
    LOG.core("USECASE: verifyUser called");

    if (!username || !password) {
      throw new Error("Username and Password for the user must be provided.");
    }

    const existingUser = await userDb.findByUsername({ username });

    LOG.core(existingUser);
    if (!existingUser) {
      return {
        ok: false,
        message: `No user with ${username} exists.`,
      };
    }

    LOG.core(password, existingUser);
    if (password === existingUser.password) {
      return {
        ok: true,
        message: `User Exists.`,
        data: {},
      };
    } else {
      return {
        ok: false,
        statusCode: 403,
        message: `Invalid Username Password combination.`,
        data: {},
      };
    }
  };
  return verifyUser;
};

module.exports = makeVerifyUser;
