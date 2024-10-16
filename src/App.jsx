import { useState } from 'react'



import './App.css'
import LoginData from './LoginData'
// import Delete from './Delete'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Delete /> */}
    <h1>Login form and with validation</h1>
     <LoginData />
    </>
  )
}

export default App
