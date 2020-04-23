import React, { Component, createRef } from 'react'
import './App.css'
import './Animations.css'
import Formulaire from './components/Formulaire'
import Message from './components/Message'



// Firebase
import base from './base'

// Animations 
import { CSSTransition, TransitionGroup } from 'react-transition-group'


class App extends Component {

  state = {
      messages: {},
      pseudo: this.props.match.params.pseudo
  }

  // for scrolling purpose 
  messagesRef = createRef()



  componentDidMount() {
    // Synch database when component is mounted
    base.syncState('/', { 
    context: this,
    state: 'messages'
    })
  }

  componentDidUpdate() {
    // When adding message keep the scroll to the bottom so you always see last posted message
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }


  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message 
    // Down method keep the state at 10 messages and remove the oldest one using slice and foreach 
    Object
    .keys(messages)
    .slice(0, -10)
    .forEach( key => {
      messages[key] = null
    })

    this.setState({ messages })

  }

  // Method to Check to see if the user sending message
  // is the same as the user who is currently logged in to render message on the right side 
  isUser = pseudo => pseudo === this.state.pseudo 


  render () {

    const messages = Object
    .keys(this.state.messages)
    .map(key => (
      <CSSTransition
        timeout={200}
        classNames='fade'
        key={key}>
        <Message 
        isUser={this.isUser}
        pseudo={this.state.messages[key].pseudo}
        message={this.state.messages[key].message}/>
      </CSSTransition>
      
    ))

    console.log(messages)
    return (
      <div className='box' >
        <div>
          <div className="messages" ref={this.messagesRef}>
            <TransitionGroup className="message">
              { messages }
            </TransitionGroup>
          </div>
        </div>
        <Formulaire 
        length={140} 
        pseudo={this.state.pseudo}
        addMessage={this.addMessage} />
      </div>
    )
  }
}

export default App
