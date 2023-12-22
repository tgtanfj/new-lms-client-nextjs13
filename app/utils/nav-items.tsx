"use client";

import Link from "next/link";

export const navItemData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Course",
    url: "/course",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

interface NavItemsProps {
  activeItem: number;
  isMobile: boolean;
}

const NavItems = ({ activeItem, isMobile }: NavItemsProps) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemData &&
          navItemData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="800px:hidden text-center py-6">
            <Link href={"/"} passHref>
              <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>ELearning</span>
            </Link>
          </div>
            {navItemData &&
              navItemData.map((i, index) => (
                <Link href={`${i.url}`} key={index} passHref>
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[crimson]"
                        : "dark:text-white text-black"
                    } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
      )}
    </>
  );
};

export default NavItems;
