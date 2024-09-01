import {Link} from 'react-router-dom'
import {differenceInYears} from 'date-fns'
import ThemeContext from '../../NxtWatchContex'

import {ThumbList, BottomSection} from '../../SytledComponents'
import './index.css'

const ThumnailCard = ({details}) => (
  <ThemeContext.Consumer>
    {value => {
      const {theme} = value
      const {thumbnailUrl, id, channel, title, viewCount, publishedAt} = details
      const today = new Date()
      const differ = differenceInYears(today, new Date(publishedAt))
      const {profileImageUrl, name} = channel
      console.log(details)
      return (
        <ThumbList value={theme}>
          <Link className="link" to={`/videos/${id}`}>
            <img className="thumb-url" src={thumbnailUrl} alt="thumbnailUrl" />
            <BottomSection value={theme}>
              <div className="profileImageUrl-container">
                <img className="profile-img" src={profileImageUrl} alt="" />
              </div>
              <div>
                <p>{title}</p>
                <p>{name}</p>
                <div className="views-years-container">
                  <p>{viewCount} Views</p>
                  <p>{differ} years ago</p>
                </div>
              </div>
            </BottomSection>
          </Link>
        </ThumbList>
      )
    }}
  </ThemeContext.Consumer>
)

export default ThumnailCard
