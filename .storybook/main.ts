import type { StorybookConfig } from "@storybook/nextjs";
import TsConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (config && config.resolve) {
      config.resolve.plugins = [new TsConfigPathsPlugin()];
      config.resolve.alias = {
        ...config.resolve.alias,
        public: path.resolve(__dirname, "../public"),
      };
    }
    if (config && config.module && config.module.rules) {
      config.module.rules = config.module.rules.map((rule) => {
        if (
          typeof rule === "object" &&
          rule &&
          "test" in rule &&
          rule.test?.toString().includes("svg")
        ) {
          rule.test = new RegExp(
            rule.test.toString().replace("svg|", "").replace("//", ""),
          );
        }
        return rule;
      });

      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      config.module.rules.push({
        test: /\.png$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      });
    }
    return config;
  },
};

export default config;
