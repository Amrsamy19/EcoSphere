"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AuthPage = () => {
  const [active, setActive] = useState<"login" | "register">("login");

  const getCoords = (width: number) => {
    if (width < 640) {
      return { loginX: -300, registerX: 100 };
    } else if (width < 1024) {
      return { loginX: -1350, registerX: 500 };
    } else if (width < 1280) {
      return { loginX: -1200, registerX: 600 };
    } else if (width < 1436) {
      return { loginX: -1100, registerX: 700 };
    } else {
      return { loginX: -1000, registerX: 800 };
    }
  };
  const [coords, setCoords] = useState<{ loginX: number; registerX: number }>({
    loginX: -1000,
    registerX: 800,
  });
  useEffect(() => {
    const updateCoords = () => {
      const width = window.innerWidth;

      setCoords(getCoords(width));
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);

    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  const divVariants = {
    login: { opacity: 1, x: coords.loginX, y: -1500 },
    register: { opacity: 1, x: coords.registerX, y: -1500, rotate: 360 },
  };

  const formVariants = {
    login: { opacity: 1, x: 0 },
    register: { opacity: 1, x: 0 },
  };

  const imgLoginVariants = {
    login: { opacity: 1, x: -800, y: 200 },
    register: { opacity: 0, x: -1850 },
  };

  const imgSignupVariants = {
    login: { opacity: 0, x: 1850 },
    register: { opacity: 1, x: 800, y: 200 },
  };

  const toSignUpVariants = {
    login: { opacity: 1, x: 0 },
    register: { opacity: 0, x: -1850 },
  };
  const toSignInVariants = {
    login: { opacity: 0, x: 1850 },
    register: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative overflow-hidden">
      <div className="w-[80%] m-auto">
        <div className="flex justify-between items-center min-h-screen ">
          {/* register form */}
          <motion.div
            className="flex gap-5 flex-col p-5 lg:w-[40%] md:w-[50%] "
            variants={formVariants}
            initial={false}
            animate={
              active === "register" ? "register" : { opacity: 0, x: 200 }
            }
            transition={{ duration: 2, delay: 0.5 }}
          >
            <p className="capitalize text-center font-extrabold text-stone-700 text-4xl">
              sign up
            </p>
            <input
              type="text"
              placeholder="Username"
              className="bg-gray-200 p-3 rounded-full transition duration-300 focus:outline-none pl-10"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-200 p-3 rounded-full transition duration-300 focus:outline-none pl-10"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-200 p-3 rounded-full transition duration-300 focus:outline-none pl-10"
            />
            <button className="bg-[#527b50] text-white p-3 rounded-full transition duration-400 hover:scale-102 flex justify-center items-center text-lg gap-2 hover:outline-2 hover:outline-[#527b50] hover:outline-offset-4">
              <Image src={"/leaf.png"} width={25} height={25} alt="leaf" />
              Sign up
            </button>
          </motion.div>

          {/* login form */}
          <motion.div
            className="flex gap-5 flex-col p-5 lg:w-[40%] md:w-[50%] rounded-2xl"
            variants={formVariants}
            animate={active === "login" ? "login" : { opacity: 0, x: -200 }}
            initial={false}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <p className="capitalize text-center font-extrabold text-stone-700 text-4xl">
              Login
            </p>
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-200 p-3 rounded-full transition duration-300 focus:outline-none pl-10"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-200 p-3 rounded-full transition duration-300 focus:outline-none pl-10"
            />
            <button className="bg-[#527b50] text-white p-3 rounded-full transition duration-400 hover:scale-102 flex justify-center items-center text-lg gap-2 hover:outline-2 hover:outline-[#527b50] hover:outline-offset-4">
              Login
              <Image
                src={"/leaf.png"}
                width={25}
                height={25}
                alt="leaf"
                className="scale-x-[-1]"
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* animated background div */}
      <motion.div
        className=" w-[1700px] h-[1700px] rounded-full bg-[#527b50] absolute"
        variants={divVariants}
        animate={active}
        initial={false}
        transition={{ duration: 2, delay: 0.5 }}
      ></motion.div>

      <motion.img
        src="/login.png"
        width={350}
        height={350}
        alt="login"
        className="absolute bottom-60 right-0"
        variants={imgLoginVariants}
        initial={false}
        animate={active}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.img
        src="/signup.png"
        width={550}
        height={350}
        alt="login"
        className="absolute bottom-60 left-0"
        variants={imgSignupVariants}
        initial={false}
        animate={active}
        transition={{ duration: 2, delay: 0.5 }}
      />

      <motion.div
        className="absolute top-10 left-25 min-w-80 flex flex-col gap-5 p-5 justify-center text-center text-white "
        variants={toSignUpVariants}
        animate={active}
        initial={false}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold">New to Ecosphere?</h2>
        <p>sign up to get started with Ecosphere</p>
        <motion.button
          onClick={() => setActive(active === "login" ? "register" : "login")}
          className="cursor-pointer bg-white text-[#527b50]  p-3 rounded-full transition duration-400 hover:scale-102 flex justify-center items-center text-lg gap-2 hover:outline-2 hover:outline-white hover:outline-offset-4 "
        >
          Sign Up
        </motion.button>
      </motion.div>
      <motion.div
        className="absolute top-10 right-40 min-w-80  flex flex-col gap-5 p-5 justify-center text-center text-white "
        variants={toSignInVariants}
        animate={active}
        initial={false}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold">One Of Us?</h2>
        <p>we are happy to see you back</p>
        <motion.button
          onClick={() => setActive(active === "login" ? "register" : "login")}
          className="cursor-pointer bg-white text-[#527b50]  p-3 rounded-full transition duration-400 hover:scale-102 flex justify-center items-center text-lg gap-2 hover:outline-2 hover:outline-white hover:outline-offset-4 "
        >
          Sign In
        </motion.button>
      </motion.div>
    </section>
  );
};

export default AuthPage;
