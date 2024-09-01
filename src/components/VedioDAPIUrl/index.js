import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {differenceInYears} from 'date-fns'
import ReactPlayer from 'react-player/youtube'
import './index.css'
import {BiLike, BiDislike} from 'react-icons/bi'
import {AiOutlineSave} from 'react-icons/ai'

import Header from '../Header'
import AsideHome from '../AsideHome'
import ThemeContext from '../../NxtWatchContex'

import {VideoAPIURLcontainer} from '../../SytledComponents'

const globalConst = {
  inprogress: 'inprogress',
  success: 'success',
  failure: 'failure',
}

class VideoDetails extends Component {
  state = {
    initial: {},
    apiStatus: 'INITIAL',
    like: false,
    dislike: false,
    save: false,
  }

  componentDidMount() {
    this.getDetails()
  }

  onclicklike = () => {
    this.setState(prevState => ({
      like: !prevState.like,
      dislike: false,
    }))
  }

  onclickdislike = () => {
    this.setState(prevState => ({
      dislike: !prevState.dislike,
      like: false,
    }))
  }

  onclicksave = () => this.setState(prevState => ({save: !prevState.save}))

  getDetails = async () => {
    await this.setState({apiStatus: globalConst.inprogress})
    const {match} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)

    if (response.ok) {
      const data = await response.json()
      const videoDetails = data.video_details
      await this.setState({
        initial: videoDetails,
        apiStatus: globalConst.success,
      })
    } else {
      await this.setState({apiStatus: globalConst.failure})
    }
  }

  progressVeiw = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  failureVeiw = () => (
    <div>
      <h1>Failure</h1>
    </div>
  )

  successView = () => {
    const {initial, like, dislike, save} = this.state
    const updatedData = {
      channel: initial.channel,
      description: initial.description,
      id: initial.id,
      publishedAt: initial.published_at,
      thumbnailUrl: initial.thumbnail_url,
      videoUrl: initial.video_url,
      title: initial.title,
      viewCount: initial.view_count,
    }

    const updatedChannel = {
      name: updatedData.channel.name,
      profileImageUrl: updatedData.channel.profile_image_url,
      subscriberCount: updatedData.channel.subscriber_count,
    }

    const addlike = like ? 'add' : null

    const adddislike = dislike ? 'add' : null

    const addsave = save ? 'add' : null

    const formateYear = new Date(updatedData.publishedAt)
    const today = new Date()

    const differ = differenceInYears(today, formateYear)

    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme} = value
          const onclicksavebtn = () => {
            const {addFavorite} = value
            addFavorite(updatedData)
            return this.onclicksave()
          }
          return (
            <VideoAPIURLcontainer value={theme}>
              <Header />
              <div className="below-container">
                <AsideHome />
                <div className="videoo-conatiner">
                  <ReactPlayer
                    width="100%"
                    url={updatedData.videoUrl}
                    controls="true"
                  />
                  <p>{updatedData.title}</p>
                  <div className="views-like-dislike-container">
                    <div className="views-c-container">
                      <p className="views-para">{updatedData.viewCount} </p>
                      <p className="views-para"> Views</p>
                      <p>{differ}</p>
                      <p> years ago</p>
                    </div>
                    <div className="like-dislike-container">
                      <div className={`like-conatiner ${addlike}`}>
                        <button
                          className={`like-conatiner ${addlike}`}
                          onClick={this.onclicklike}
                          type="button"
                        >
                          <BiLike />
                          Like
                        </button>
                      </div>
                      <div className={`dislike-conatiner ${adddislike}`}>
                        <button
                          className={`dislike-conatiner ${adddislike}`}
                          onClick={this.onclickdislike}
                          type="button"
                        >
                          <BiDislike />
                          Dislike
                        </button>
                      </div>
                      <div className={`save-conatiner ${addsave}`}>
                        <button
                          className={`save-conatiner ${addsave}`}
                          onClick={onclicksavebtn}
                          type="button"
                        >
                          <AiOutlineSave />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr className="horizontal" />
                  <div className="channel-container">
                    <div>
                      <img
                        className="profile-img"
                        src={updatedChannel.profileImageUrl}
                        alt="img"
                      />
                    </div>
                    <div>
                      <p>{updatedChannel.name}</p>
                      <br />
                      <p>{updatedChannel.subscriberCount} subscribers</p>
                      <br />
                      <p>{updatedData.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </VideoAPIURLcontainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case globalConst.success:
        return this.successView()
      case globalConst.failure:
        return this.failureVeiw()
      case globalConst.inprogress:
        return this.progressVeiw()
      default:
        return null
    }
  }
}

export default VideoDetails
