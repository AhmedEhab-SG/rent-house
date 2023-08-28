"use client";

import useFilter from "@/hooks/useFilter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

const Logo = () => {
  const router = useRouter();
  const { onFilterShow } = useFilter();

  return (
    <Fragment>
      <Image
        onClick={() => (router.push("/"), onFilterShow())}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/images/logo.png"
      />
      <Image
        onClick={() => (router.push("/"), onFilterShow())}
        alt="Logo"
        className="block md:hidden cursor-pointer"
        height="40"
        width="40"
        src="/images/airbnb-logo.png"
      />
    </Fragment>
  );
};

export default Logo;
