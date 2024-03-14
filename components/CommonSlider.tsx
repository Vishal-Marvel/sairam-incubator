"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect } from "react";
import { MainCarousel } from "@prisma/client";

interface Props {
  images: String[];
}

export const CommonSlider = ({ images }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(-1);
  const [count, setCount] = React.useState(-1);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(
      api.selectedScrollSnap() === api.scrollSnapList().length
        ? 0
        : api.selectedScrollSnap()
    );

    api.on("select", () => {
      setCurrent(
        api.selectedScrollSnap() === api.scrollSnapList().length
          ? 0
          : api.selectedScrollSnap()
      );
    });
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
          stopOnInteraction:false
        }),
      ]}
      className="w-screen bg-blue-500 bg-opacity-5"
    >
      <CarouselContent>
        {images &&
          images.map((img, index) => (
            <CarouselItem
              key={index}
              className="md:basis-full lg:basis-full w-full flex justify-center  bg-gray-400"
            >
              <Image
                src={img as string}
                alt=""
                className={"md:h-[600px] w-full object-contain"}
                height={200}
                width={400}
              />
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};