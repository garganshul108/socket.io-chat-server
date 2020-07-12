const makePostSignup = ({ addUser }) => {
  const postSignup = async (httpRequest) => {
    LOG.core("CONTROLLER: postSignup called.");
    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object

      const username = httpRequest.body.username;
      const password = httpRequest.body.password;
      const { ok, statusCode, ...posted } = await addUser({
        username,
        password,
      });
      if (ok) {
        return {
          headers: {
            "Content-Type": "application/json",
            "Last-Modified": new Date().toUTCString(),
          },
          statusCode: 201,
          body: { ...posted },
        };
      } else {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: statusCode || 400,
          body: { ...posted },
        };
      }
    } catch (err) {
      // LOG.core(err);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
      };
    }
  };
  return postSignup;
};

module.exports = makePostSignup;
