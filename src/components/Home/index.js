import {Component} from 'react'
import {IoIosClose} from 'react-icons/io'
import Header from '../Header'
import ListOfThumbniles from '../ListOfThumbileContainer'
import AsideHome from '../AsideHome'

import './index.css'
import {HomeContainer} from '../../SytledComponents'

import ThemeContext from '../../NxtWatchContex'

class Home extends Component {
  state = {show: true}

  onClickClose = () => {
    this.setState({show: false})
  }

  render() {
    const {show} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <HomeContainer themeValue={theme} data-testid="home">
              <Header />
              <div className="aside-home-container">
                <AsideHome />
                <div className="right-aside-conatiner">
                  {show ? (
                    <div className="banner-conatiner" data-testid="banner">
                      <div className="close-btn" data-testid="close">
                        <button
                          onClick={this.onClickClose}
                          aria-label="close"
                          type="button"
                        >
                          <IoIosClose />
                        </button>
                      </div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        alt="nxt watch logo"
                      />
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>
                  ) : null}
                  <ListOfThumbniles />
                </div>
              </div>
            </HomeContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
