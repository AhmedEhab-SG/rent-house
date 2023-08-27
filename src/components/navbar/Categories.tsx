"use client";

import Container from "../shared/Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import CategoryBox from "../shared/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categoriesArr = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This proprety in close to beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This proprety has windmills!",
  },
  {
    label: "Modren",
    icon: MdOutlineVilla,
    description: "This proprety is modren!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This proprety is countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This proprety is has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This proprety is on an islands!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This proprety is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This proprety has skinng activites!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This proprety is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This proprety camping activtes!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This proprety artic activtes!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This proprety is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This proprety is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This proprety is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This proprety is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  const categories = categoriesArr.map((item) => (
    <CategoryBox
      key={item.label}
      label={item.label}
      selected={category === item.label}
      icon={item.icon}
    />
  ));

  return (
    <Container>
      <div
        className="
      pt-4
      flex
      flex-row
      items-center
      justify-between
      overflow-x-auto"
      >
        {categories}
      </div>
    </Container>
  );
};

export default Categories;
