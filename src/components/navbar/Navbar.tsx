"use client";

import Container from "../shared/Container";
import Categories from "./Categories";
import Logo from "./Logo";
import NotRealSite from "./NotRealSite";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types";
import useFilter from "@/hooks/useFilter";
import { useRouter } from "next/navigation";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  const { onFilterShow } = useFilter();

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div
        className="
      py-4
      border-b-[1px]"
      >
        <Container>
          <div
            className="
        flex
        flex-row
        items-center
        justify-between
        gap-3
        md:gap0
        "
          >
            <div
              onClick={() => (router.push("/"), onFilterShow())}
              className="flex justify-center items-center gap-1 cursor-pointer"
            >
              <Logo />
              <p className="text-red-700 font-extrabold text-lg hidden md:block">
                Rent-Home
              </p>
            </div>
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <NotRealSite />
      <Categories />
    </div>
  );
};

export default Navbar;
