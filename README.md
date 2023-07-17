# webpackUpdateVersionPlugin
webpack plugin to autoincrement package version. It increments the mayor by 1 each time it is executed.

To use it, load it as a plugin in your webpack.config.js file:

```javascript
const WebpackUpdateVersionPlugin = require('webpack-update-version-plugin');

module.exports = {
  plugins: [
	new WebpackUpdateVersionPlugin()
  ]
}
```

it can also be added in optimize section of webpack.config.js file:

```javascript
const WebpackUpdateVersionPlugin = require('webpack-update-version-plugin');

module.exports = {
  optimization: {
	minimizer: [
	  new WebpackUpdateVersionPlugin()
	]
  }
}
```
