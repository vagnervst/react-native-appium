import React from 'react'

import { ENV } from '../env.json'

const Routes = React.lazy(() => ENV === 'e2e'
  ? import('./Routes.e2e')
  : import('./Routes')
)

const App = () => (
  <>
    <React.Suspense fallback={<></>}>
      <Routes />
    </React.Suspense>
  </>
)

export default App
