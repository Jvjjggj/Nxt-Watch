import styled from 'styled-components'

export const HomeContainer = styled.div`
  background-color: ${props => (props.themeValue ? '#f9f9f9' : '#181818')};
`

export const Aside = styled.div`
  color: ${props => (props.value ? 'black' : 'white')};
`

export const AsideContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => (!props.value ? '#475569' : 'white')};
  justify-content: space-between;
`

export const LogosContainer = styled.div`
  color: ${props => (props.value ? 'black' : 'white')};
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ThemeBtn = styled.button`
  border: 0;
  color: ${props => (props.value ? 'black' : 'white')};
`

export const LogoutBtn = styled.button`
  color: ${props => (props.value ? 'black' : 'white')};
  boder-color: ${props => (props.value ? 'black' : 'white')};
`

export const ThumbList = styled.li`
  margin: 10px 10px 10px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  width: 25%;
  color: ${props => (props.value ? 'white' : 'black')};
`

export const BottomSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 5px;
  color: ${props => (!props.value ? 'white' : 'black')};
`

export const VideoAPIURLcontainer = styled.div`
  color: ${props => (!props.value ? 'white' : 'black')};
  padding: 20px;
  background-color: ${props => (!props.value ? 'black' : 'white')};
`
export const SavedItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${props => (props.value ? 'black' : 'white')};
`

export const TrendingContainer = styled.div`
  background-color: ${props => (!props.value ? '#0f0f0f' : '#f9f9f9')};
`

export const PopupBtn = styled.button`
  color: ${props => (props.value ? 'white' : 'black')};
`
