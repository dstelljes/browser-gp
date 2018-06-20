import React from 'react'
import styled from 'react-emotion'

import { TOGGLE_MENU } from '../data/actions'
import { connect } from '../utilities/router'

const Container = styled.div`
  display: flex;
`

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch({
      type: TOGGLE_MENU
    })
  }
}

export const PageTitle = connect(
  undefined,
  mapDispatchToProps
)(function ({ children, toggleMenu }) {
  return (
    <Container>
      <button onClick={toggleMenu}>Menu</button>
      <h1>{children}</h1>
    </Container>
  )
})
