import {
  CHANGE_ROUTE,
  RENDER_ROUTE,
  CHANGE_STATUS,
  CHANGE_LOADING,
  CHANGE_LOCATION,
} from './const'

export const initial = {
  route: {
    name: null,
    status: null,
    loading: false,
  },
  params: {},
  location: {
    query: {},
  },
}

const reduceLocation = (state, { location }) => {
  const loc = {
    ...location,
    host: location.host || state.host,
    port: location.port || state.port,
    hostname: location.hostname || state.hostname,
    protocol: location.protocol || state.protocol,
  }

  const {
    protocol,
    hostname,
    port,
    pathname,
    search,
    hash,
  } = loc

  return Object.assign(loc, {
    href: [
      protocol ? `${protocol}//` : '',
      protocol ? hostname : '',
      protocol && hostname && port ? `:${port}` : '',
      pathname,
      search,
      hash,
    ].join(''),
  })
}

export default (state = initial, action) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return {
        ...state,
        route: action.status ? {
          ...state.route,
          status: action.status,
        } : state.route,
        location: reduceLocation(state.location, action),
      }

    case CHANGE_ROUTE:
      return {
        ...state,
        route: {
          ...action.route,
        },
        params: {
          ...action.params,
        },
      }

    case RENDER_ROUTE:
      return {
        ...state,
        route: {
          ...action.route,
        },
      }

    case CHANGE_STATUS:
      return {
        ...state,
        route: {
          ...state.route,
          status: action.status,
        },
      }

    case CHANGE_LOADING:
      return {
        ...state,
        route: {
          loading: action.loading,
        },
      }

    default:
      return state
  }
}
