const stylus = {
  fileRegexp: /\.(styl|css)$/,
  loaderName: 'stylus-loader'
}
const sass = {
  fileRegexp: /\.(sass|scss|css)$/,
  loaderName: 'sass-loader'
}

const less = {
  fileRegexp: /\.(less|css)$/,
  loaderName: 'less-loader'
}

// Set preprocessor here
const selectedPreprocessor = sass;

module.exports = {
  selectedPreprocessor
}