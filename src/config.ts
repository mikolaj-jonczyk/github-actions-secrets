import * as dotenv from 'dotenv';

function getConfig() {
  dotenv.config();
  return {
    secret: process.env.TEST_SECRET
  }
}

const appConfig = getConfig();

export {appConfig}

