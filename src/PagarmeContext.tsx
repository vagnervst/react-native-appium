import React, { createContext, useContext, useState } from 'react'
import { identity } from 'ramda'

const PagarmeStateContext = createContext({})
const PagarmeDispatchContext = createContext(identity)

const PagarmeProvider = ({ children } : { children: any }) => {
  const [state, dispatch] = useState({})

  return (
    <PagarmeStateContext.Provider value={state}>
      <PagarmeDispatchContext.Provider value={dispatch}>
        {children}
      </PagarmeDispatchContext.Provider>
    </PagarmeStateContext.Provider>
  )
}

const usePagarmeState = () => {
  const context = useContext(PagarmeStateContext)
  return context
}

const usePagarmeDispatch = () => {
  const context = useContext(PagarmeDispatchContext)
  return context
}

export {
  PagarmeProvider,
  usePagarmeDispatch,
  usePagarmeState,
}
