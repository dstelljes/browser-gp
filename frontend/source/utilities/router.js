import { connect as connectStore } from 'react-redux'
import { withRouter } from 'react-router-dom'

export const connect = (mapState, mapDispatch) => component => {
  return withRouter(connectStore(mapState, mapDispatch)(component))
}
