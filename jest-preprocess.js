const babelOptions = {
  presets: [
      ['@babel/preset-env', {targets: {node: "current"}}],
      "@babel/preset-react",
      "@babel/preset-typescript"
  ],
}

module.exports = require(`babel-jest`).default.createTransformer(babelOptions)
