const path = require("path")
const config = require("./config.json")

module.exports = (env, argv) => {
    const configWebpack = require("./webpack.config.js")(env, argv)

    configWebpack.devServer = {
        devMiddleware: {
            writeToDisk: true
        },
        client: {
            overlay: {
                errors: true,
                warnings: false
            },
            progress: true
        },
        static: {
            directory: path.join(__dirname, "public")
            // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
            // Can be:
            // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
            // publicPath: "/static-public-path/",
            // Can be:
        },
        open: ["/"],
        host: `${config.frontendHost}`,
        port: config.frontendPort,
        historyApiFallback: {
            rewrites: [
                {
                    from: new RegExp(
                        `/${config.context}/(.*).(js|css|jpg|jpeg|gif|png|PNG|woff|woff2|eot|ttf|svg)$`,
                        "g"
                    ),
                    to: "$1.gz"
                },
                { from: /./, to: "index.html" }
            ]
        },
        proxy: {
            [`/${config.backendContext}/api`]: {
                target: `http://${config.reverseProxyHost}:${config.backendPort}`, // set json-server to your host conf file
                secure: false
            }
        },
        watchFiles: ["src/**/*.js", "src/**/*.jsx"],
        headers: {
            "Cache-Control": "no-store"
        },
        server: "http"
    }

    return configWebpack
}
