import type { Configuration } from "webpack";

import DeadCodePlugin from "webpack-deadcode-plugin";
import { TimeAnalyticsPlugin } from "time-analytics-webpack-plugin";
import { DuplicatesPlugin } from "inspectpack/plugin";
import { merge } from "webpack-merge";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import argv from "webpack-nano/argv";
import commonConfig from "./common.config";
import partsConfig from "./parts.config";

import "webpack-dev-server";

const devConfig: Configuration = {
  output: {
    chunkFilename: "js/[name].chunk.js",
    filename: "js/[name].bundle.js",
  },
  devServer: {
    static: "./static",
    historyApiFallback: true,
    open: true,
  },
  devtool: "eval-cheap-module-source-map",
  optimization: {
    // creates an additional chunk for the runtime code, so it's cheap to generate
    runtimeChunk: true,
    // Webpack does extra algorithmic work to optimize the output for size and load performance.
    // These optimizations are performant for smaller codebases, but can be costly in larger ones:
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    // @ts-ignore
    new DeadCodePlugin({
      patterns: ["src/**/*.(ts|scss|hbs|css)"],
      exclude: ["**/*.test.ts", "**/types.ts", "**/server.ts"],
    }),
    new DuplicatesPlugin(),
  ],
};

const prodConfig: Configuration = {
  output: {
    chunkFilename: "js/[id].[contenthash].js",
    filename: "js/[id].[contenthash].js",
    clean: true,
  },
  plugins: [
    // @ts-ignore
    new CaseSensitivePathsPlugin(),
  ],
};

const getConfig = (mode: string = "production") => {
  switch (mode) {
    case "production":
      return merge(commonConfig, partsConfig, prodConfig, { mode });
    case "development":
      return TimeAnalyticsPlugin.wrap(
        merge(commonConfig, partsConfig, devConfig, { mode })
      );
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

export default getConfig((argv.mode as string) || "production");
