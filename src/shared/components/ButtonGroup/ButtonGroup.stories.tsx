import type { Meta, StoryObj } from "@storybook/react";

import { ButtonGroup } from "./ButtonGroup";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Primary: Story = {
  args: {
    buttons: [
      {
        children: "Нажми на меня!",
      },
      {
        children: "И на меня!",
      },
    ],
    sizeVariant: "big",
  },
};
