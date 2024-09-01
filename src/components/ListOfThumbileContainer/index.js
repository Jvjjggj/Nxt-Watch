import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import ThumnailCard from '../ThumbnailCard'
import './index.css'

const globalConst = {
  inprogress: 'inprogress',
  success: 'success',
  failure: 'failure',
}

class ListOfThumbniles extends Component {
  state = {initialData: [], apiStatus: 'initial'}

  componentDidMount() {
    this.getData()
  }

  updateData1 = i => {
    const uChannel = {
      name: i.channel.name,
      profileImageUrl: i.channel.profile_image_url,
    }

    return {
      channel: uChannel,
      id: i.id,
      publishedAt: i.published_at,
      thumbnailUrl: i.thumbnail_url,
      viewCount: i.view_count,
      title: i.title,
    }
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    await this.setState({apiStatus: globalConst.inprogress})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://apis.ccbp.in/videos/all?search=',
      options,
    )

    if (response.status) {
      const data = await response.json()
      const updateOutside = data.videos.map(i => this.updateData1(i))
      await this.setState({
        initialData: updateOutside,
        apiStatus: globalConst.success,
      })
    } else {
      await this.setState({apiStatus: globalConst.failure})
    }
  }

  successVeiw = () => {
    const {initialData} = this.state
    return (
      <ul className="unorder-list-thumbnail">
        {initialData.map(i => (
          <ThumnailCard details={i} key={i.id} />
        ))}
      </ul>
    )
  }

  failureVeiw = () => <div className="failure-container">Failure</div>

  progressVeiw = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  getThumnailContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case globalConst.success:
        return this.successVeiw()

      case globalConst.failure:
        return this.failureVeiw()

      case globalConst.inprogress:
        return this.progressVeiw()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <input type="search" />
          <button aria-label="search" type="button">
            <FaSearch />
          </button>
        </div>
        {this.getThumnailContainer()}
      </div>
    )
  }
}
export default ListOfThumbniles
