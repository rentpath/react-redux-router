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


### rendering

By using the `<Router />`, react will update your component tree post transition.
In some cases, such as displaying a modal on a url change it can be desirable to
skip the re-rendering of said route for slight performance boost.

consider the following route

```tsx
{
  path: '/somePath'
  resolve: () => modalParam ? { dangerouslySkipRender: true } : { component: Page}
}
```

under the hood, this prop sets the component up to automatically reject updates on transition to something like `/somePath?displayModal=true`.

while useful in some cases, it is considered a bad pattern to block updates to components in such way. according to the react team:

> shouldComponentUpdate - This method only exists as a performance optimization. Do not rely on it to “prevent” a rendering, as this can lead to bugs. Consider using the built-in PureComponent instead of writing shouldComponentUpdate() by hand. PureComponent performs a shallow comparison of props and state, and reduces the chance that you’ll skip a necessary update.

we should avoid blocking updates to a component directly. you should avoid using this props when you can and focus on
creating lighter connected components that do not update so agressively instead.

## Releasing

1. Inside your pull request, bump the semantic version in `package.json`
2. Merge the pull request
3. Wait for the GitHub Actions [workflow](https://github.com/rentpath/actions) to publish your new package [here](https://github.com/rentpath/react-redux-router/packages).

Note: You can also manually [draft a release](https://github.com/rentpath/react-redux-router/releases/new) to set off the package publishing workflow.