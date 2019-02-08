import match from './match'
import { push } from './actions'

export default ({
  store,
  location,
  ...options
} = {}) => {
  if (!store) {
    throw new Error('Expected to receive a redux store.')
  }
  return match({
    dispatch: store.dispatch,
    getState: store.getState,
    location: store.dispatch(push(location)).location,
    ...options,
  })
}
