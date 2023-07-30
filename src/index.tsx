import { render } from 'react-dom'
import App from './app/App.tsx'
import { StrictMode } from 'react'



render(
  <StrictMode>
    <App />
  </StrictMode>
  
,
  document.getElementById('root')
)

