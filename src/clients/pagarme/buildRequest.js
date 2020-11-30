const axios = require('axios')

const build = ({
  method,
  body,
  path,
  params,
}) => axios({
  baseURL: 'https://api.pagar.me/1/',
  url: path,
  method,
  params,
  data: body,
})
  .then(response => response.data)
  .catch(({ response }) => {
    console.error(response.data)
  })

module.exports = build
