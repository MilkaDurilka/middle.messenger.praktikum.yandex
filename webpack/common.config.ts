import * as path from "path";
import type { Configuration } from "webpack";
import { EnvironmentPlugin } from "webpack";
import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";

const configDotEnv = dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

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
    new EnvironmentPlugin({
      ROOT_API_URL: configDotEnv.parsed?.ROOT_API_URL,
    }),
  ],
};

export default config;
