import createHistory from 'history/createBrowserHistory'
import { pop } from './actions'
import {
  POP,
  PUSH,
  REPLACE,
  GO,
  GO_BACK,
  GO_FORWARD,
  INIT_ROUTER,
  RENDER_ROUTE,
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

export default ({
  history = createHistory(),
} = {}) => ({ dispatch }) => {
  let path
  let resp
  let router

  history.listen((location, action) => {
    if (action !== POP) return
    dispatch(pop(location))
  })

  return next => action => {
    switch (action.type) {
      case INIT_ROUTER:
        router = action.router
        return next(action)

      case GO: case GO_BACK: case GO_FORWARD:
        history[methods[action.type]](action.index)
        return next(action)

      case CHANGE_LOCATION:
        resp = next(action)
        path = buildPath(action.location)

        if (methods[action.method]) {
          history[methods[action.method]](path)
        }
        if (router) {
          router.transition(action.location)
        }

        return resp

      case RENDER_ROUTE:
        return buildPath(action.location) === path ? next(action) : undefined

      default:
        return next(action)
    }
  }
}
