const fs = require('fs')

const environment = process.argv[2] || 'development'

const envFileContent = require(`../envs/${environment}.json`)

const writeEnvs = envs => Object.keys(envs).reduce((acc, key) => {
  return acc + `${key}=${envs[key]}\n`
}, '')

fs.writeFileSync('.env', writeEnvs(envFileContent))
