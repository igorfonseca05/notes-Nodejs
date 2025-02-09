import { useState } from 'react'
import './App.css'
import Uploa from './components/Uploa';
import Test from './components/exercicios/Test';

function App() {

  const name = 'igor ribeiro da fonseca'

  // console.log(name.match(/Igor/gi))
  console.log(/igor/g.test(name))

  return (
    <>

      <div className='form_container'>
        {/* <Test /> */}
        <Uploa />
        {/* <h1>test</h1>
        <img src="data:image/jpg;base64,binário" /> */}
      </div>


    </>
  )
}

export default App
