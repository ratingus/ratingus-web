import type { Meta, StoryObj } from "@storybook/react";
import { SwiperSlide } from "swiper/react";

import { Slider } from "./Slider";
import styles from "./Slider.stories.module.scss";

import { Typography } from "@/shared/components/Typography/Typography";

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  render: () => (
    <Slider className={styles.test}>
      <SwiperSlide>
        <Typography color="textPrimary">Понедельник</Typography>
      </SwiperSlide>
      <SwiperSlide>
        <Typography color="textPrimary">Вторник</Typography>
      </SwiperSlide>
      <SwiperSlide>
        <Typography color="textPrimary">Среда</Typography>
      </SwiperSlide>
      <SwiperSlide>
        <Typography color="textPrimary">Четверг</Typography>
      </SwiperSlide>
    </Slider>
  ),
};
