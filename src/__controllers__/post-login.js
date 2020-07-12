const makePostLogin = ({ verifyUser }) => {
  const postLogin = async (httpRequest) => {
    LOG.core("CONTROLLER: postLogin Called");

    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object

      const username = httpRequest.body.username;
      const password = httpRequest.body.password;
      const { ok, statusCode, ...posted } = await verifyUser({
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
            "Last-Modified": new Date().toUTCString(),
          },
          statusCode: statusCode || 400,
          body: { ...posted },
        };
      }
    } catch (err) {
      // console.log(err);
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
  return postLogin;
};

module.exports = makePostLogin;
