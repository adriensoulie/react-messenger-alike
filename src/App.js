import React, { Component } from 'react'
import './App.css'
import Formulaire from './components/Formulaire'

class App extends Component {
  render () {
    return (
      <div className='box' >
        <div>
          <div className="messages">
            Messages
          </div>
        </div>
        <Formulaire />
      </div>
    )
  }
}

export default App
