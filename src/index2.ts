import { Octokit } from "octokit";
import { appConfig } from "./config";


async function storeASecret() {

  //take shit from env file
  const configuration = appConfig.secret;

  console.log(configuration);
  // use it here

  // normally backup to aws

}


storeASecret();