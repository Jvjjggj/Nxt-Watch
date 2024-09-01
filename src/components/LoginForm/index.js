import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    getVerified: false,
  }

  trackUsername = async e => {
    await this.setState({username: e.target.value})
  }

  trackPassword = async e => {
    await this.setState({password: e.target.value})
  }

  changePass = async () => {
    await this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  redirctToSuccess = JwtToken => {
    console.log(JwtToken)
    Cookies.set('jwt_token', JwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  handleSubmit = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.redirctToSuccess(data.jwt_token)
    } else {
      await this.setState({errorMsg: data.error_msg, getVerified: true})
    }
  }

  render() {
    const {errorMsg, getVerified, showPassword} = this.state
    const inputPass = showPassword ? 'input' : 'password'

    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <label htmlFor="userId">USERNAME</label>
          <input onChange={this.trackUsername} type="text" id="userId" />
          <label htmlFor="passId">PASSWORD</label>
          <input onChange={this.trackPassword} type={inputPass} id="passId" />
          <input onClick={this.changePass} type="checkbox" />
          <p>Show Password</p>
          {getVerified && <p className="error-para">{errorMsg}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
