import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "Рейтингус",
    brandUrl: "https://ratingus.fun/",
    brandImage: "https://avatars.githubusercontent.com/u/165987745?s=128&v=4",
  }),
});
