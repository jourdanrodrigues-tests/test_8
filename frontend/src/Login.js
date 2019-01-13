import React from 'react'
import styled from 'styled-components'

import apiClient from './apiClient'

const Page = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

const formWidth = '70%'

const Form = styled.form`
  width: 20em;
  height: 20em;
  box-shadow: 0 2px 7px gray;
  border-radius: 2px;
  background-color: lightblue;
  transform: translateY(-10em);
  
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Label = styled.label`
  width: ${formWidth};
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`

const Button = styled.button`
  width: ${formWidth};
  height: 2em;
  font-size: 12pt;
  cursor: pointer;
  
  &:first-of-type {
    margin-bottom: 1em;
  }
`

class Login extends React.Component {
  state = {
    name: '',
    password: '',
  }

  constructor() {
    super()

    this.updateName = this.updateName.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.switchAuthentication = this.switchAuthentication.bind(this)
  }

  updateName(e) {
    this.setState({name: e.target.value})
  }

  updatePassword(e) {
    this.setState({password: e.target.value})
  }

  authenticate(e) {
    e.preventDefault()

    const {name, password} = this.state
    const auth = this.state.loggingIn ? apiClient.login : apiClient.createUser
    const message = this.state.loggingIn ? 'Logged successfully' : 'Registered successfully'
    auth({name, password})
      .then(() => {
        alert(message)
      })
      .catch(error => {
        alert(error.response.data)
      })
  }

  switchAuthentication() {
    this.setState({loggingIn: !this.state.loggingIn})
  }

  render() {
    return (
      <Page>
        <Form onSubmit={this.authenticate}>
          <Label>
            <span>Name</span>
            <input required value={this.state.name} onChange={this.updateName}/>
          </Label>
          <Label>
            <span>Password</span>
            <input required type="password" value={this.state.password} onChange={this.updatePassword}/>
          </Label>
          <Button type="submit">{this.state.loggingIn ? 'Log In' : 'Sign Up'}</Button>
          <Button type="button" onClick={this.switchAuthentication}>
            {this.state.loggingIn ? 'New user?' : 'Already registered?'}
          </Button>
        </Form>
      </Page>
    )
  }
}

export default Login
