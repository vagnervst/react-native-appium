const buildRequest = require('./buildRequest')

const client = () => {
  let authentication = {}

  const transactions = {
    findOne: (id) => buildRequest({
      method: 'GET',
      path: `/transactions/${id}`,
      params: {
        ...authentication,
      },
    }),
    findAll: (params) => buildRequest({
      method: 'GET',
      path: '/transactions',
      params: {
        ...params,
        ...authentication,
      },
    }),
    refund: (id) => buildRequest({
      method: 'POST',
      path: `/transactions/${id}/refund`,
      params: {
        ...authentication,
      },
    }),
    create: (body) => buildRequest({
      method: 'POST',
      path: '/transactions',
      params: {
        ...authentication,
      },
      body,
    }),
  }

  const authenticate = async (params) => {
    try {
      if (params.email && params.password) {
        const { session_id } = await buildRequest({
          method: 'POST',
          path: '/sessions',
          body: params,
        })

        authentication = { session_id }
      }

      if (params.api_key) {
        authentication = { api_key: params.api_key }
      }
    } catch (error) {
      throw error
    }
  }

  return {
    authenticate,
    transactions,
  }
}

module.exports = client
