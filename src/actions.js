import parse from 'parse-location'
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
  CHANGE_LOADING,
  CHANGE_LOCATION,
} from './const'

export const initRouter = router => ({
  type: INIT_ROUTER,
  router,
})

export const changeRoute = payload => ({
  type: CHANGE_ROUTE,
  ...payload,
})

export const renderRoute = payload => ({
  type: RENDER_ROUTE,
  ...payload,
})

export const changeStatus = status => ({
  type: CHANGE_STATUS,
  status,
})

export const changeLoading = loading => ({
  type: CHANGE_LOADING,
  loading,
})

export const changeLocation = (payload = {}) => ({
  type: CHANGE_LOCATION,
  ...payload,
  location: parse(payload.location || ''),
})

export const pop = location => changeLocation({
  method: POP,
  location,
})

export const push = (location, status) => (
  changeLocation({
    method: PUSH,
    location,
    status,
  })
)

export const replace = (location, status) => (
  changeLocation({
    method: REPLACE,
    location,
    status,
  })
)

export const go = index => ({
  type: GO,
  index,
})

export const goBack = () => ({
  type: GO_BACK,
})

export const goForward = () => ({
  type: GO_FORWARD,
})
