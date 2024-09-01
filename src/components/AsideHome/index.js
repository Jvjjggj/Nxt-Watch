import {TiHome} from 'react-icons/ti'
import {FaFire, FaSave} from 'react-icons/fa'
import {IoLogoGameControllerB} from 'react-icons/io'
import {Link} from 'react-router-dom'

import './index.css'
import {Aside, AsideContainer, LogosContainer} from '../../SytledComponents'

import ThemeContext from '../../NxtWatchContex'

const AsideHome = () => (
  <ThemeContext.Consumer>
    {value => {
      const {theme} = value
      return (
        <div className="aside-home-containerrr">
          <AsideContainer value={theme}>
            <div>
              <Link value={theme} className="home-li" to="/">
                <Aside value={theme} className="home-link">
                  <TiHome />
                  <p>Home</p>
                </Aside>
              </Link>
              <Link value={theme} to="/trending">
                <Aside value={theme} className="home-link">
                  <FaFire />
                  <p>Trending</p>
                </Aside>
              </Link>
              <Link value={theme} to="/gaming">
                <Aside value={theme} className="home-link">
                  <IoLogoGameControllerB />
                  <p>Gaming</p>
                </Aside>
              </Link>
              <Link value={theme} to="/saved-videos">
                <Aside value={theme} className="home-link">
                  <FaSave />
                  <p>Saved videos</p>
                </Aside>
              </Link>
            </div>
            <LogosContainer value={theme}>
              <h1 className="contact-head">CONTACT US</h1>
              <div className="logos-container">
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  className="logo"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p>Enjoy! Now to your channels and recommendations</p>
            </LogosContainer>
          </AsideContainer>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default AsideHome
