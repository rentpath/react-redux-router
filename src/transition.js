import { matchRoutes } from 'little-router'
import { changeRoute, renderRoute } from './actions'
import { isFunc, isPromise, sanitize } from './utils'
import { STATUS_OK, STATUS_NOT_FOUND } from './const'

export default async (options = {}) => {
  const {
    strict,
    routes = [],
    location = {},
    dispatch,
    beforeRender,
  } = options

  const route = {}
  const params = {}
  const actions = []
  const resolvers = {}
  const components = {}

  let promises
  let sanitized

  // match route branches
  const branches = matchRoutes({
    path: location.pathname || '',
    routes,
    strict,
  })

  // reduce route object while extracting
  // actions, resolvers, and components
  branches.forEach((branch, index) => {
    const { route: { action, resolve, component, ...rest } } = branch

    Object.assign(route, rest)
    Object.assign(params, branch.params)

    if (action) {
      actions.push(action)
    }
    if (resolve) {
      resolvers[index] = resolve
    }
    if (component) {
      components[index] = component
    }
  })

  // set loading flag
  route.loading = true

  // ensure route has a status
  if (!route.status) {
    route.status = branches.length ? STATUS_OK : STATUS_NOT_FOUND
  }

  // clean route for dispatch
  sanitized = sanitize(route)
  delete sanitized.routes

  // dispatch route change action
  if (dispatch) {
    dispatch(changeRoute({
      route: sanitized,
      params,
      location,
    }))
  }

  // resolve routes with async properties
  promises = []
  Object.keys(resolvers).forEach(index => {
    const resolver = resolvers[index]
    const response = Promise.resolve(resolver({ route, params, location }))
    promises.push(response.then(({
      action,
      component,
      ...props
    } = {}) => {
      Object.assign(route, props)
      if (action) {
        actions.push(action)
      }
      if (component) {
        components[index] = component
      }
    }))
  })

  if (promises.length) {
    await Promise.all(promises)
  }

  // dispatch route actions
  if (dispatch) {
    promises = []
    actions.forEach(action => {
      if (isFunc(action)) {
        const resp = dispatch(action({ route, params, location }))
        if (isPromise(resp)) {
          promises.push(resp)
        }
      } else {
        dispatch(action)
      }
    })
    if (promises.length) {
      await Promise.all(promises)
    }
  }

  // update loading flag
  route.loading = false

  // sort components into proper order before
  // adding back to route
  route.components = Object.keys(components).sort().map(key => (
    components[key]
  ))

  // define a result object since
  // we need it twice below
  const result = {
    route,
    routes,
    strict,
    params,
    location,
  }

  // this callback is useful for ensuring
  // custom actions get dispatched in the
  // same render cycle that gets triggered by
  // the actions being triggered in this file
  if (isFunc(beforeRender)) {
    beforeRender(result)
  }

  // clean route for dispatch
  sanitized = sanitize(route)
  delete sanitized.routes
  delete sanitized.components

  // dispatch render route action
  if (dispatch) {
    dispatch(renderRoute({
      route: sanitized,
      params,
      location,
    }))
  }

  return result
}
