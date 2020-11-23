import buildRequest from './buildRequest'

const client = () => {
  let authentication = {}

  const transactions = {
    findOne: (id: number) => buildRequest({
      method: 'GET',
      path: `/transactions/${id}`,
      params: {
        ...authentication,
      },
    }),
    findAll: (params?: object) => buildRequest({
      method: 'GET',
      path: '/transactions',
      params: {
        ...params,
        ...authentication,
      },
    }),
    refund: (id: number) => buildRequest({
      method: 'POST',
      path: `/transactions/${id}/refund`,
      params: {
        ...authentication,
      },
    })
  }

  const authenticate = async (params: any) => {
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

export default client()
