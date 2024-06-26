"use client";
import * as React from "react";
import Image from "next/image";
import { Parallax, useParallax } from "react-scroll-parallax";
export const AboutUs = () => {

  return (
    <div
    
      id="about-us"
      className="why relative flex justify-center items-center align-middle justify-items-center bg-blue-500 bg-opacity-5 h-full py-10 overflow-hidden lg:flex-row flex-col gap-10 max-w-screen"
      style={{
        width: "100%",
        transition: "background-position 0.3s ease",
        backgroundPosition: "0% 0%",
      }}
    >

      <img
        loading="lazy"
        src="illustration1.png"
        alt="ill1"
        className=" hidden lg:block absolute w-[400px] h-[400px] rotate-0 -top-[150px] -right-[200px] -z-20"
        style={{
          filter:
            "invert(47%) sepia(31%) saturate(4645%) hue-rotate(201deg) brightness(101%) contrast(96%)",
        }}
      />

      <img
        loading="lazy"
        src="illustration1.png"
        alt="ill1"
        className="hidden lg:block absolute w-[400px] h-[400px] rotate-0 -bottom-[150px] -left-[250px] -z-20"
        style={{
          filter:
            "invert(47%) sepia(31%) saturate(4645%) hue-rotate(201deg) brightness(101%) contrast(96%)",
        }}
      />
      <Image
        width={3000}
        height={3000}
        src={"/incubator-logo.png"}
        alt={"Sairam Incubator Foundation Logo"}
        className="w-[50%] lg:h-[500px] lg:w-[420px] h-[80%] filter transition-transform duration-500 ease-in-out hover:scale-110 mt-[15%] md:mt-[0%] object-contain"
      />
     
      <div className="flex flex-col w-[80%] md:w-[40%] ml-10">
        <h2 className="font-montserrat font-bold text-rgba-17-17-17-80 lg:text-6xl md:text-4xl text-2xl">
          WHY INCUBATION
          <br />
          IN SAIRAM?
        </h2>
        <hr className="underline border-b-8 mt-[5%] w-[30%] border-blue-500 rounded-full mb-[5%]" />
        <p className="font-montserrat font-normal text-[1.2rem] md:text-[clamp(1.2rem, 0.23rem + 1.14vw, 1.6rem)] leading-[32px] text-454545 text-justify md:text-start">
          The incubation process allows entrepreneurs to preserve capital and
          gain external support to accelerate their business growth.
          <br />
          Through business incubation, the enterprise center captures each
          entrepreneur’s uniqueness and offers support and customized services
          to maximize business potential.
        </p>
      </div>
      
    </div>
  );
};
