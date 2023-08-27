"use client";

import { FaGithub } from "react-icons/fa";
import ClientOnly from "./shared/ClientOnly";

const Footer = () => {
  return (
    <ClientOnly>
      <footer className="flex flex-col md:flex-row justify-evenly items-center bg-slate-200 w-full p-2 font-semibold text-gray-700 text-lg">
        <div className="mt-1">Next-Airbnbtsx.</div>
        <a href="https://github.com/AhmedEhab-SG" target="_blank">
          <div className="m-3">Built By Ahmed Ehab.</div>
        </a>
        <a href="https://github.com/AhmedEhab-SG/next-airbnb" target="_blank">
          <div className="flex justify-center items-center gap-2">
            <div className="mb-1">Interested? Feel Free.</div>
            <FaGithub size={25} />
          </div>
        </a>
      </footer>
    </ClientOnly>
  );
};

export default Footer;
