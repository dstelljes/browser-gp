import React from 'react'
import { Link } from 'react-router-dom'

export const SolutionList = function ({ solutions }) {
  return (
    <ul>
      {Object.keys(solutions).map(id => (
        <li>
          <Link to={`/solution/${id}`}>{id}</Link>
        </li>
      ))}
    </ul>
  )
}
