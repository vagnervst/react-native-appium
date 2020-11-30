import React, { useEffect } from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { API_KEY } from '@env'

import LoginPage from './pages/Login'
import Transactions from './pages/Transactions'
import TransactionDetails from './pages/TransactionDetails'

import pagarme from './clients/pagarme'

import { usePagarmeDispatch } from './PagarmeContext'

const Stack = createStackNavigator()

const App = () => {
  const pagarmeDispatch = usePagarmeDispatch()

  const linking = {
    prefixes: ['e2e://'],
    config: {
      screens: {
        Login: 'Login',
        Transactions: 'Transactions',
        TransactionDetails: 'TransactionDetails',
      },
    },
  }

  useEffect(() => {
    const client = pagarme()

    client.authenticate({ api_key: API_KEY })

    pagarmeDispatch(client)
  }, [])

  if (apiKey) {
    client.authenticate({ api_key: apiKey })
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
