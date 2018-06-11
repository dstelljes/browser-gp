import React from 'react'
import styled from 'react-emotion'
import { Route, Switch } from 'react-router-dom'

import { connect } from '../utilities/router'

import { LandingRoute } from './LandingRoute'
import { NewSolutionRoute } from './NewSolutionRoute'
import { NotFoundRoute } from './NotFoundRoute'
import { SolutionList } from './SolutionList'
import { SolutionRoute } from './SolutionRoute'

const Main = styled.div`
  background-color: ${({ theme }) => theme.pageBackgroundColor};
  font-family: ${({ theme }) => theme.bodyFontFamily};
  height: 100%;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  transform: ${({ inset }) => inset ? 'scale(0.9) translateX(16em)' : 'none'};
  transition: transform ${({ theme }) => theme.largeAnimationDuration};
  width: 100%;
`

const Navigation = styled.div`
  font-size: 125%;
`

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.applicationBackgroundColor};
  font-size: ${({ theme }) => theme.baseSize};
  height: 100%;
  overflow-x: hidden;
  width: 100%;
`

const mapStateToProps = state => {
  return {
    menuExpanded: state.navigation.menuExpanded,
    solutions: state.solution.library
  }
}

export const NavigationContainer = connect(
  mapStateToProps,
  undefined
)(function ({ menuExpanded, solutions }) {
  return (
    <Wrapper>
      <Navigation>
        <SolutionList solutions={solutions} />
      </Navigation>

      <Main inset={menuExpanded}>
        <Switch>
          <Route component={LandingRoute} path='/' exact />
          <Route component={NewSolutionRoute} path='/solution/new/:engine' />
          <Route component={SolutionRoute} path='/solution/:id' />
          <Route component={NotFoundRoute} />
        </Switch>
      </Main>
    </Wrapper>
  )
})
