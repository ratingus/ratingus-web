import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./Typography";

import vars from "@/shared/styles/vars.module.scss";

const meta: Meta<typeof Typography> = {
  component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Primary: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam assumenda at commodi consectetur consequuntur doloremque dolores error et eveniet expedita iure, laboriosam minus natus placeat possimus provident quam, quos repudiandae.",
    variant: "body",
    color: "textPrimary",
  },
  argTypes: {
    color: {
      options: Object.keys(vars),
      control: "select",
    },
    component: {
      options: [
        "p",
        "div",
        "span",
        "b",
        "i",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
    },
  },
};
