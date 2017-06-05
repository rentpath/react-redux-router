import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import transition from '../transition'
import { initRouter, pop } from '../actions'

class Router extends PureComponent {
  static propTypes = {
    router: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    render: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    initialLocation: PropTypes.object,
    strict: PropTypes.bool,
    onChange: PropTypes.func,
    route: PropTypes.shape({
      components: PropTypes.array,
    }),
  }

  static defaultProps = {
    route: {},
  }

  constructor(props) {
    super(props)
    props.dispatch(initRouter(this))
    this.route = {
      ...props.route,
      ...props.router.route,
    }
    if (props.initialLocation) {
      props.dispatch(pop(props.initialLocation))
    }
  }

  componentWillUpdate(props) {
    if (props.router.route !== this.props.router.route) {
      this.route = {
        ...this.route,
        ...props.router.route,
      }
    }
  }

  transition(location) {
    transition({
      location,
      strict: this.props.strict,
      routes: this.props.routes,
      dispatch: this.props.dispatch,
      beforeRender: result => {
        this.route = {
          ...result.route,
          ...this.props.router.route,
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

  render() {
    const {
      router,
      render,
    } = this.props

    const props = {
      ...router,
      route: this.route,
    }

    if (render) {
      return render(props)
    }

    if (!this.route.components) {
      return null
    }

    return this.route.components.reduceRight((children, Route) => (
      <Route {...props} children={children} />
    ), null)
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
    router,
  }
})(Router)
