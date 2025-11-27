import React from "react";
import HomeHero from "../HomeHero";

const HomeHeroLayout = () => {
  return (
    <div className="min-h-screen relative">
      <HomeHero />
      <div className="absolute inset-0 gap-5 h-screen w-full hidden md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-amber-600"></div>
        <div className="hidden lg:block"></div>
        <div className="bg-amber-600"></div>
      </div>
    </div>
  );
};

export default HomeHeroLayout;
