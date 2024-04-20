import type { Preview } from "@storybook/react";
import "@/app/(router)/(main)/globals.scss";

// @ts-ignore
import vars from "@/shared/styles/vars.module.scss";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: vars.backgroundMain,
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
