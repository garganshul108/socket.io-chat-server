const debug = require("debug");
const startup = debug("s-io-cs:startup");
const core = debug("s-io-cs:core");
const db = debug("s-io-cs:db");

const LOG = {
  startup,
  core,
  db,
};

LOG.startup("Logging Service Configured");

global.LOG = LOG;
