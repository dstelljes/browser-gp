import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider as StoreProvider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { createStore } from 'redux'

import { NavigationContainer } from './NavigationContainer'
import { rootReducer } from './reducers'
import { theme } from '../ui/theme'

const store = createStore(rootReducer)

const Root = hot(module)(function () {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <NavigationContainer />
      </ThemeProvider>
    </HashRouter>
  )
})

export const Application = function () {
  return (
    <StoreProvider store={store}>
      <Root />
    </StoreProvider>
  )
}
