const consola = require("consola");
const knexConfig = require("../knexfile");

const knex = require("knex")(knexConfig);
const redis = require("async-redis").createClient(process.env.REDIS_URL);

const util = require("util");
const { isEmpty, omit } = require("lodash");

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const db = {
  async init() {
    let connectionOk = false;
    let retries = 10;
    consola.info("connecting to database");
    while (!connectionOk && --retries) {
      try {
        const data = await knex.raw("SELECT VERSION()");
        consola.success(data.rows[0].version);
        connectionOk = true;
      } catch (e) {
        consola.error(e.message);
        await sleep(2000);
      }
    }

    if (!connectionOk) {
      consola.error("couldn't establish connection to database");
    }

    consola.success(`Redis: ${redis.server_info.redis_version}`);
  },
  knex: knex,
  redis: redis,
  async quit() {
    await knex.destroy();
    await redis.quit();
  }
};

exports = module.exports = db;
