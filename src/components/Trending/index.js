import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import ThemeContext from '../../NxtWatchContex'
import Header from '../Header'
import TrendingCard from '../TrendingCard'

import AsideHome from '../AsideHome'
import {TrendingContainer} from '../../SytledComponents'
import './index.css'

const globalConst = {
  inprogress: 'inprogress',
  success: 'success',
  failure: 'failure',
}

class TrendingPage extends Component {
  state = {trendingdata: [], apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    await this.setState({apiStatus: globalConst.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/videos/trending',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(i => {
        const updatedChannel = {
          name: i.channel.name,
          profileImageUrl: i.channel.profile_image_url,
        }

        return {
          channel: updatedChannel,
          id: i.id,
          publishedAt: i.published_at,
          thumbnailUrl: i.thumbnail_url,
          title: i.title,
          viewCount: i.view_count,
        }
      })
      await this.setState({
        trendingdata: updatedData,
        apiStatus: globalConst.success,
      })
    } else {
      await this.setState({apiStatus: globalConst.failure})
    }
  }

  viewProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  viewSuccess = () => {
    console.log('suceess')
    const {trendingdata} = this.state
    return (
      <div>
        <h1>Trending</h1>
        <ul>
          {trendingdata.map(i => (
            <TrendingCard details={i} key={i.id} />
          ))}
        </ul>
      </div>
    )
  }

  viewFailure = () => {
    console.log('failure')
  }

  viewTrendingDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case globalConst.success:
        return this.viewProgress()
      case globalConst.inprogress:
        return this.viewProgress()
      case globalConst.failure:
        return this.viewFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme} = value
          return (
            <TrendingContainer data-testid="trending" value={theme}>
              <Header />
              <div className="trending-container">
                <AsideHome />
                {this.viewTrendingDetails()}
              </div>
            </TrendingContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingPage
