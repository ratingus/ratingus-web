import type { Preview } from "@storybook/react";
import { Roboto } from "next/font/google";

import "@/app/(router)/(main)/globals.scss";

// @ts-ignore
import vars from "@/shared/styles/vars.module.scss";

const font = Roboto({
  weight: ["300", "500"],
  variable: "--font-main",
  subsets: ["cyrillic", "latin"],
});

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
  decorators: [(Story) => <div className={font.className}>{Story()}</div>],
};

export default preview;
