import { Octokit } from "octokit";
import { appConfig } from "./config";


async function storeASecret() {

  //take shit from env file
  const configuration = appConfig.secret;

  if(configuration === 'plain-text-secret'){
    console.log('we got this!')
  }
  else {
    console.log('trouble')
  }
  
  // use it here

  // normally backup to aws

}


storeASecret();