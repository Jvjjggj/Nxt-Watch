import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import ThemeContext from './NxtWatchContex'
import './App.css'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideoDetails from './components/VedioDAPIUrl'
import Favorites from './components/Favorites'
import TrendingPage from './components/Trending'

// Replace your code here
class App extends Component {
  state = {theme: true, favoriteList: []}

  changeTheme = async () => {
    await this.setState(prevState => ({theme: !prevState.theme}))
  }

  addFavorite = async data => {
    const {favoriteList} = this.state

    const findFavData = i => i.id === data.id

    const findData = favoriteList.filter(findFavData)
    console.log(findData)
    if (findData.length === 0) {
      await this.setState(prevState => ({
        favoriteList: [...prevState.favoriteList, data],
      }))
    }
  }

  render() {
    const {theme, favoriteList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          theme,
          changeTheme: this.changeTheme,
          favoriteList,
          addFavorite: this.addFavorite,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <ProtectedRoute exact path="/saved-videos" component={Favorites} />
          <ProtectedRoute exact path="/trending" component={TrendingPage} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
