import React from "react";
import HomeHero from "./HomeHero";
import LeftFloatingImg from "./LeftFloatingImg";

const HomeHeroLayout = () => {
  return (
    <div className="min-h-screen relative">
      <HomeHero />
      <div className="absolute inset-0 gap-5 h-screen w-full hidden md:grid md:grid-cols-2 lg:grid-cols-3">
        {/* left */}
        <div className="">
          <LeftFloatingImg />
        </div>
        <div className="hidden lg:block"></div>
        {/* right */}
        <div className=""></div>
      </div>
    </div>
  );
};

export default HomeHeroLayout;
