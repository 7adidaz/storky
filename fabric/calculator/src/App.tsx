import { useContext } from 'react'
import './App.css'
import Advanced from './components/Adv'
import NumPad from './components/NumPad'
import Operations from './components/Operations'
import Result from './components/Result'
import { LanguageProvider } from './i8n/LanguageContextProvider'

function App() {
  return (
    <div className='main-app'>
      <LanguageProvider>
        <Advanced />
        <Result />
        <NumPad />
        <Operations />
      </LanguageProvider>
    </div>
  )
}

export default App
