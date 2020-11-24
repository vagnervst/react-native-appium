const fs = require('fs')

const environment = process.argv[2] || 'development'

const envFileContent = require(`../envs/${environment}.json`)

fs.writeFileSync('env.json', JSON.stringify(envFileContent))
