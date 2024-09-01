import {Link} from 'react-router-dom'
import './index.css'
import {differenceInYears} from 'date-fns'
import ThemeContext from '../../NxtWatchContex'

import {SavedItemsContainer} from '../../SytledComponents'

const FavoriteCard = ({details}) => {
  const {thumbnailUrl, title, channel, viewCount, publishedAt} = details
  const {name} = channel
  const today = new Date()
  const differ = differenceInYears(today, new Date(publishedAt))
  return (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value
        const style = theme ? 'add-light' : 'add-dark'
        console.log(theme)
        return (
          <SavedItemsContainer className="sc" value={theme}>
            <Link className={`${style}`} to={`/videos/${details.id}`}>
              <div className="img-container">
                <img className="thumb-url-img" src={thumbnailUrl} alt="url" />
              </div>
              <div className="details-containeer">
                <h1 className="title-heading">{title}</h1>
                <p>{name}</p>
                <p>{viewCount} Views</p>
                <p>{differ} years ago</p>
              </div>
            </Link>
          </SavedItemsContainer>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default FavoriteCard
