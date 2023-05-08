import * as path from "path";
import type { Configuration } from "webpack";

import HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  entry: "./src/app/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
    pathinfo: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
    symlinks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
  ],
};

export default config;
