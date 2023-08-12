import { render } from 'react-dom'

import App from './components/app/App'
import { StrictMode } from 'react'



render(
  <StrictMode>
    <App />
  </StrictMode>
  
,
  document.getElementById('root')
)

