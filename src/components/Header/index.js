import {Link, Redirect, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'
import {TiWeatherSunny} from 'react-icons/ti'
import Cookies from 'js-cookie'
import './index.css'
import ThemeContext from '../../NxtWatchContex'
import {ThemeBtn, LogoutBtn} from '../../SytledComponents'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {changeTheme, theme} = value

      const onClickChangeTheme = () => {
        changeTheme()
      }

      const logout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.push('/login')
        return <Redirect to="/login" />
      }
      return (
        <>
          {theme ? (
            <div className="header-container">
              <div className="web-logo-container">
                <Link to="/">
                  <img
                    className="web-log-img"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                </Link>
              </div>
              <div className="log-profile-container">
                <ThemeBtn
                  value={theme}
                  aria-label="theme"
                  type="button"
                  onClick={onClickChangeTheme}
                >
                  <FaMoon />
                </ThemeBtn>
                <img
                  className="profile-imgg"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
                <Popup
                  modal
                  trigger={
                    <LogoutBtn
                      value={theme}
                      type="button"
                      className="trigger-button"
                    >
                      Logout
                    </LogoutBtn>
                  }
                >
                  {close => (
                    <div className="popup-btns">
                      <button
                        type="button"
                        className="p-btn"
                        value={theme}
                        onClick={logout}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="trigger-button p-btn"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          ) : (
            <div className="header-container">
              <div className="web-logo-container">
                <Link to="/">
                  <img
                    className="web-log-img"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                  />
                </Link>
              </div>
              <div className="log-profile-container">
                <ThemeBtn
                  value={theme}
                  aria-label="theme"
                  type="button"
                  onClick={onClickChangeTheme}
                  className="btn"
                >
                  <TiWeatherSunny />
                </ThemeBtn>
                <img
                  className="profile-imgg"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />

                <Popup
                  modal
                  trigger={
                    <LogoutBtn
                      value={theme}
                      type="button"
                      className="trigger-button"
                    >
                      Logout
                    </LogoutBtn>
                  }
                >
                  {close => (
                    <div className="popup-btns">
                      <button
                        className="p-btn"
                        type="button"
                        value={theme}
                        onClick={logout}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="trigger-button p-btn"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          )}
        </>
      )
    }}
  </ThemeContext.Consumer>
)
export default withRouter(Header)
