import { createBrowserHistory } from 'history'
import { pop } from './actions'
import {
  POP,
  PUSH,
  REPLACE,
  GO,
  GO_BACK,
  GO_FORWARD,
  INIT_ROUTER,
  CHANGE_ROUTE,
  RENDER_ROUTE,
  CHANGE_STATUS,
  CHANGE_LOCATION,
} from './const'

const methods = {
  [PUSH]: 'push',
  [REPLACE]: 'replace',
  [GO]: 'go',
  [GO_BACK]: 'goBack',
  [GO_FORWARD]: 'goForward',
}

const buildPath = location => (
  `${location.pathname}${location.search}${location.hash}`
)

export default (
  config = {},
) => ({ dispatch }) => {
  let resp
  let router
  let history
  let transition

  if (config.history) {
    ({ history } = config)
  } else if (config.history === undefined && typeof window !== 'undefined') {
    history = createBrowserHistory()
  }

  if (history) {
    history.listen((location, action) => {
      if (action !== POP) return
      dispatch(pop(location))
    })
  }

  return next => action => {
    switch (action.type) {
      case INIT_ROUTER:
        ({ router } = action)
        break

      case GO: case GO_BACK: case GO_FORWARD:
        if (history) {
          history[methods[action.type]](action.index)
        }
        break

      case CHANGE_LOCATION:
        resp = next(action)

        if (transition) {
          console.log('transition invalid', transition, action.location, action.status)
          transition.invalid = true
        }
        if (history && methods[action.method]) {
          history[methods[action.method]](buildPath(action.location))
        }
        if (router) {
          router.transition(action.location, action.status)
        }

        return resp

      case CHANGE_ROUTE:
        ({ transition } = action)
        break

      case CHANGE_STATUS:
        if (transition) {
          transition.status = action.status
        }
        break

      case RENDER_ROUTE:
        transition = null
        break
    }

    return next(action)
  }
}
