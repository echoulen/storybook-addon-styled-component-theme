module.exports = function({config}) {
    config.module.rules.push({
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        test: /\.(ts|tsx)$/,
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
};
