import React, { forwardRef, ReactNode } from "react";
import cl from "classnames";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperProps, SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./Slider.module.scss";

const baseClasses = cl(styles.base);

type SliderProps = {
  swiperProps?: SwiperProps;
  children?: ReactNode[];
  className?: string;
};

export const Slider = forwardRef<SwiperRef, SliderProps>(
  ({ className, children = [], swiperProps }, ref) => {
    return (
      <Swiper
        ref={ref}
        className={cl(baseClasses, className)}
        modules={[Navigation]}
        centeredSlides
        centeredSlidesBounds
        slidesPerView={1}
        navigation
        {...swiperProps}
      >
        {children}
      </Swiper>
    );
  },
);

Slider.displayName = "Slider";
