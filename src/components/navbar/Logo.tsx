"use client";

import Image from "next/image";
import { Fragment } from "react";

const Logo = () => {
  return (
    <Fragment>
      <Image
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="50"
        width="50"
        src="/images/red-logo.png"
      />
      <Image
        alt="Logo"
        className="block md:hidden cursor-pointer"
        height="40"
        width="40"
        src="/images/red-logo.png"
      />
    </Fragment>
  );
};

export default Logo;
