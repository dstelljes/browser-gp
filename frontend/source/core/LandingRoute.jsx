import React from 'react'
import { Link } from 'react-router-dom'

import { PageTitle } from './PageTitle'

export const LandingRoute = function () {
  return (
    <main>
      <PageTitle>Create a new solution</PageTitle>

      <Link to='/solution/new/tinygp'>
        Create a new TinyGP solution
      </Link>
    </main>
  )
}
