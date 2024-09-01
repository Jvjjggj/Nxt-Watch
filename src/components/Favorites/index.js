import {Component} from 'react'
import ThemeContext from '../../NxtWatchContex'
import {VideoAPIURLcontainer} from '../../SytledComponents'
import Header from '../Header'
import AsideHome from '../AsideHome'
import FavoriteCard from '../SavedCard'
import './index.css'

class Favorites extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme, favoriteList} = value
          return (
            <VideoAPIURLcontainer value={theme}>
              <Header />
              <div className="below-container">
                <AsideHome />
                {favoriteList.length === 0 ? (
                  <div>
                    <center>
                      <img
                        width="100%"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                      />
                      <h1>No saved videos found</h1>
                      <p>You can save your videos while watching them</p>
                    </center>
                  </div>
                ) : (
                  <div value={theme}>
                    <h1>Saved Videos</h1>
                    <ul>
                      {favoriteList.map(i => (
                        <FavoriteCard details={i} key={i.id} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </VideoAPIURLcontainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Favorites
