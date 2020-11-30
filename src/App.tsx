import React from 'react'
import { ENV } from '@env'

import { PagarmeProvider } from './PagarmeContext'

const Routes = React.lazy(() => ENV === 'e2e'
  ? import('./Routes.e2e')
  : import('./Routes')
)

const App = () => (
  <PagarmeProvider>
    <React.Suspense fallback={<></>}>
      <Routes />
    </React.Suspense>
  </PagarmeProvider>
)

export default App
