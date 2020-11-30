import React, { useEffect, useState } from 'react'

import TransactionsContainer from '../../containers/Transactions'

import { usePagarmeState } from '../../PagarmeContext'

const TransactionsPage = ({ navigation }) => {
  const pagarme = usePagarmeState()
  const [transactions, setTransactions] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = () => {
    setRefreshing(true)

    pagarme.transactions.findAll({ status: 'paid' })
      .then(setTransactions)
      .then(() => setRefreshing(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleItemPress = (transactionId) => {
    navigation.push('TransactionDetails', {
      id: transactionId,
    })
  }

  return (
    <TransactionsContainer
      onItemPress={handleItemPress}
      transactions={transactions}
      onRefresh={fetchData}
      refreshing={refreshing}
    />
  )
}

export default TransactionsPage
