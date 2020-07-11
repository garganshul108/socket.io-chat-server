const makePostSignup = ({ addUser }) => {
  const postSignup = async (httpRequest) => {
    LOG.core("CONTROLLER: postSignup called.");
    try {
      // extract data from httpRequest.body
      // check express callback handler for this
      // return status based http responsifiable object

      const username = httpRequest.body.username;
      const password = httpRequest.body.password;
      const posted = await addUser({ username, password });
      if (posted.ok) {
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
          statusCode: posted.statusCode || 400,
          body: { ...posted },
        };
      }
    } catch (err) {
      console.log(err);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
  return postSignup;
};

module.exports = makePostSignup;
