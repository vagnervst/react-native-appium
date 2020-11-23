import React from 'react'

import TransactionDetailsContainer from '../../containers/TransactionDetails'

import pagarme from '../../clients/pagarme'

type PropTypes = {
  route: {
    params: {
      id: number,
    },
  },
}

const TransactionDetails = ({
  route,
} : PropTypes) => {
  const transactionId = route.params.id

  const providers = {
    getTransaction: () => pagarme.transactions.findOne(transactionId),
    refundTransaction: () => pagarme.transactions.refund(transactionId),
  }

  return (
    <TransactionDetailsContainer
      providers={providers}
    />
  )
}

export default TransactionDetails
