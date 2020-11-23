import React from 'react'

import LoginContainer from '../../containers/Login'

import client from '../../clients/pagarme'

type PropTypes = {
  navigation: any,
}

type SubmitProps = {
  email: string,
  password: string,
}

const LoginPage = ({ navigation }: PropTypes) => {
  const handleSubmit = (
    { email, password }: SubmitProps
  ) => {
    client.authenticate({ email, password })
      .then(() => navigation.navigate('Transactions'))
  }

  return (
    <LoginContainer
      onLogin={handleSubmit}
    />
  )
}

export default LoginPage
