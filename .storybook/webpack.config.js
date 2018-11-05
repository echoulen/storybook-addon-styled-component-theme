module.exports = function(baseConfig, env, config) {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
