import { Octokit } from "octokit";


async function storeASecret() {

  const octokit = new Octokit({
    auth: process.env.TOKEN
  })

  const repository = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: 'mikolaj-jonczyk',
    repo: 'github-actions-secrets'
  })
  // get a public key from repo
  const keys = await octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key', {
    repository_id: repository.data.id,
    environment_name: 'test-environment',
  })

  const sodium = require('libsodium-wrappers')
  const secret = 'plain-text-secret' // replace with the secret you want to encrypt
  const key = keys.data.key // replace with the Base64 encoded public key


  const output = await sodium.ready.then(() => {
    // Convert Secret & Base64 key to Uint8Array.
    let binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL)
    let binsec = sodium.from_string(secret)

    //Encrypt the secret using LibSodium
    let encBytes = sodium.crypto_box_seal(binsec, binkey)

    // Convert encrypted Uint8Array to Base64
    let output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL)
    return output;
  });

  const response = await octokit.request('PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}', {
    repository_id: repository.data.id,
    environment_name: 'test-environment',
    secret_name: 'TEST_SECRET',
    encrypted_value: output,
    key_id: keys.data.key_id
  })

}


storeASecret();