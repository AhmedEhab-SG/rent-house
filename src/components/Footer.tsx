"use client";

import { FaGithub } from "react-icons/fa";
import ClientOnly from "./shared/ClientOnly";
import Image from "next/image";
import logo from "../assets/red-logo.png";

const Footer = () => {
  return (
    <ClientOnly>
      <footer className="flex flex-col md:flex-row justify-evenly items-center bg-gray-100 w-full p-2 font-semibold text-gray-700 text-lg">
        <div className="flex justify-center items-center gap-2 mt-1 text-rose-500 font-bold">
          <Image src={logo} className="w-8" alt="airbnb-logo" />
          <div className="">Rent-House</div>
        </div>
        <a href="https://github.com/AhmedEhab-SG" target="_blank">
          <div className="m-3">Built By Ahmed Ehab.</div>
        </a>
        <a href="https://github.com/AhmedEhab-SG/next-airbnb" target="_blank">
          <div className="flex justify-center items-center gap-2">
            <div className="mb-1 text-gray-500">Interested? Feel Free.</div>
            <FaGithub size={25} />
          </div>
        </a>
      </footer>
    </ClientOnly>
  );
};

export default Footer;
