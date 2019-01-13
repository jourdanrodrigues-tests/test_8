import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Login from './Login'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Login/>, document.querySelector('.root'))
serviceWorker.unregister()
