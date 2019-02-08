import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import parseLocation from 'parse-location'
import { push, replace } from '../actions'

const isModifiedEvent = event => (
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
)

export default class Link extends PureComponent {
  static contextTypes = {
    store: PropTypes.object,
  }

  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    replace: PropTypes.bool,
    onClick: PropTypes.func,
    target: PropTypes.string,
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
      && this.context.store
    ) {
      event.preventDefault()
      const { dispatch } = this.context.store

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
