import React, { useReducer } from 'react'
import {
  Button,
  TextInput,
  View,
} from 'react-native'
import { mergeRight } from 'ramda'

const LoginContainer = ({ onLogin }) => {
  const [data, setData] = useReducer(mergeRight, {})

  return (
    <View>
      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={text => setData({ email: text })}
        value={data.email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setData({ password: text })}
        value={data.password}
      />
      <Button
        accessibilityLabel="login-button"
        testID="login-button"
        title="Login"
        onPress={() => onLogin(data)}
      />
    </View>
  )
}

export default LoginContainer
