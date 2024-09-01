import React from 'react'

const ThemeContext = React.createContext({
  theme: true,
  changeTheme: () => {},
  favoriteList: [],
  addFavorite: () => {},
})

export default ThemeContext
