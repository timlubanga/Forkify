const path=require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin");

module.exports={
    entry:['babel-polyfill','./src/js/index.js'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    //where the server will serve from/ the server folder should be the same path as output folder
    devServer:{
        contentBase:'./dist'
    },
    // create an index file where the bundle js will be injected
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        })
    ],
    // loader convert files versions or formats
    module:{
        rules:[
            {
            test:/\.js$/,
            exclude:/node_modules/,
            use:{
                loader:'babel-loader'
            }
        }
    ]
    }


}
