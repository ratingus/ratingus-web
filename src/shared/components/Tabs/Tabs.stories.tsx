import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  args: {
    options: [
      {
        value: "users",
        label: "Пользователи",
      },
      {
        value: "classes",
        label: "Классы",
      },
      {
        value: "other",
        label: "Прочее",
      },
    ],
    sizeVariant: "big",
  },
};
