import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ReactReduxContext } from 'react-redux'
import parseLocation from 'parse-location'
import { push, replace } from '../actions'

const isModifiedEvent = event => (
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
)

class InnerLink extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    replace: PropTypes.bool,
    store: PropTypes.object,
    target: PropTypes.string,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
  }

  static defaultProps = {
    replace: false,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event)
    }

    if (
      !event.defaultPrevented
      && event.button === 0
      && !this.props.target
      && !isModifiedEvent(event)
      && this.props.store
    ) {
      const { dispatch } = this.props.store
      event.preventDefault()

      if (this.props.replace) {
        dispatch(replace(this.props.to))
      } else {
        dispatch(push(this.props.to))
      }
    }
  }

  render() {
    const {
      to,
      replace: repl,
      dispatch,
      ...props
    } = this.props
    const href = typeof to === 'string' ? to : parseLocation(to).href

    return (
      <a
        {...props}
        href={href}
        onClick={this.handleClick}
      />
    )
  }
}

const Link = outerProps => (
  <ReactReduxContext.Consumer>
    {({ store }) => <InnerLink {...outerProps} store={store} />}
  </ReactReduxContext.Consumer>
)

export default Link
