import Image from "next/image";
import React from "react";

const LeftFloatingImg = () => {
  return (
    <div className=" relative h-screen ">
      <div className="absolute left-[7%] bottom-[50%] lg:bottom-auto lg:top-[20%] lg:left-[40%] w-[35%] rounded-full aspect-square z-20 ">
        <Image
          width={500}
          height={500}
          alt="left floating img"
          src="/homeHero/event.png"
          className=" w-full h-full rounded-full aspect-square border-2 border-background overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
        />
      </div>
      <div className="absolute left-[20%] bottom-[20%] lg:bottom-auto lg:top-[45%] lg:left-[5%] w-[35%] rounded-full aspect-square z-20 ">
        <Image
          width={500}
          height={500}
          alt="left floating img"
          src="/homeHero/game.png"
          className=" w-full h-full rounded-full aspect-square border-2 border-background overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
        />
      </div>
      <div className="absolute left-[60%] bottom-[1%] lg:bottom-auto lg:top-[60%] lg:left-[55%] w-[35%] rounded-full aspect-square z-20">
        <Image
          width={500}
          height={500}
          alt="left floating img"
          src="/homeHero/recycle.png"
          className="w-full h-full rounded-full aspect-square border-2 border-background overflow-hidden hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
        />
      </div>
    </div>
  );
};

export default LeftFloatingImg;
