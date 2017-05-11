# react-redux-router
A universal router for applications using redux and react.

## Usage
```javascript
import { render } from 'react-dom'
import Home from './Home'
import NotFound from './NotFound'
import { Router } from 'react-redux-router'

const routes = [
  { path: '/', component: Home },
  { path: '*', component: NotFound }
]

const App = () => (
  <Router routes={routes} initialLocation={window.location} />
)

render(App, document.body)
```

## API

### `push(location, [status])`
Appends a new location to history.
- [`location`] \(*String|Object*): The new location.
- [`status`] \(*Number*): The status code for the new location.

### `replace(location, [status])`
Replaces the current location.
- [`location`] \(*String|Object*): The new location.
- [`status`] \(*Number*): The status code for the new location.

### `go(index)`
Moves location backwards or forwards in history.
- [`index`] \(*Number*): The relative number of locations.

### `goBack()`
Moves location backwards.

### `goForward()`
Moves location forward.

### `<Router routes initialLocation>`
- [`routes`] \(*Array*): The new location.
- [`initialLocation`] \(*Object*): The initial location to use.

### `<Link to replace>`
Renders a link that updates the current location when clicked.
- [`to`] \(*String|Object*): The location to use for the `href` attribute.
- [`replace`] \(*Bool*): Whether to use dispatch a `replace` action when clicked.
