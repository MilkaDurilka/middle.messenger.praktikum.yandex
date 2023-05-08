import type { Configuration } from "webpack";
import { getIfUtils, removeEmpty } from "webpack-config-utils";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import argv from "webpack-nano/argv";
import path from "path";

const mode: string = (argv.mode as string) || "production";
const { ifProduction, ifNotProduction } = getIfUtils(mode);

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: path.resolve(__dirname, "../src"),
        use: removeEmpty([
          ifProduction("ts-loader"),
          ifNotProduction({
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          }),
        ]),
      },
      {
        test: /\.module\.scss$/,
        include: path.resolve(__dirname, "../src"),
        use: removeEmpty([
          ifNotProduction("style-loader"),
          ifProduction(MiniCssExtractPlugin.loader),
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                namedExport: true,
              },
            },
          },
          "sass-loader",
        ]),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "../src/app/styles"),
        use: removeEmpty([
          ifNotProduction("style-loader"),
          ifProduction(MiniCssExtractPlugin.loader),
          "css-loader",
          "sass-loader",
        ]),
      },
      {
        test: /\.hbs$/,
        include: path.resolve(__dirname, "../src"),
        loader: "handlebars-loader",
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        include: path.resolve(__dirname, "../static"),
        type: "asset/resource",
      },
    ],
  },
  plugins: removeEmpty([
    ifProduction(
      new MiniCssExtractPlugin({
        filename: "css/[id].[contenthash].css",
      })
    ),
  ]),
};

export default config;
