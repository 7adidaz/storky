import './App.css'
import Advanced from './components/Adv'
import NumPad from './components/NumPad'
import Operations from './components/Operations'
import Result from './components/Result'

function App() {

  return (
    <div className='main-app'>
      <Advanced />
      <Result />
      <NumPad />
      <Operations />
    </div>
  )
}

export default App
