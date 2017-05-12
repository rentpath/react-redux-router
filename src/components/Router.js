import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import transition from '../transition'
import { initRouter, pop } from '../actions'

class Router extends PureComponent {
  static propTypes = {
    routes: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    initialLocation: PropTypes.object,
    strict: PropTypes.bool,
    onChange: PropTypes.func,
    params: PropTypes.object,
    route: PropTypes.shape({
      components: PropTypes.array,
    }),
  }

  static defaultProps = {
    route: {},
    params: {},
  }

  constructor(props) {
    super(props)
    this.current = {
      route: props.route,
      params: props.params,
    }
    props.dispatch(initRouter(this))
    if (props.initialLocation) {
      props.dispatch(pop(props.initialLocation))
    }
  }

  componentWillUpdate(props) {
    if (props.loading !== this.props.loading) {
      this.current.route.loading = props.loading
    }
  }

  transition(location) {
    transition({
      location,
      strict: this.props.strict,
      routes: this.props.routes,
      dispatch: this.props.dispatch,
      beforeRender: result => {
        this.current = {
          route: result.route,
          params: result.params,
        }
        if (this.props.onChange) {
          this.props.onChange({
            route: result.route,
            params: result.params,
            location,
          })
        }
      },
    })
  }

  renderRoute(route, params) {
    return route.components.reduceRight((children, Route) => (
      <Route
        route={route}
        params={params}
        location={this.props.location}
        children={children}
      />
    ), null)
  }

  render() {
    const { route, params } = this.current
    return route ? this.renderRoute(route, params) : null
  }
}

export default connect((state, { selectState }) => {
  const router = selectState
    ? selectState(state)
    : state.router
  if (!router) {
    throw new Error('<Router>: expected to find router state using key `router`.')
  }
  return {
    loading: router.route.loading,
    location: router.location,
  }
})(Router)
