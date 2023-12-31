"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavItems from "../utils/nav-items";
import ThemeSwitcher from "../utils/theme-switcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/custom-modal";
import Login from "./Auth/login";
import SignUp from "./Auth/sign-up";
import Verifycation from "./Auth/verifycation";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/images/avatar.jpg";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setRoute: (route: string) => void;
  route: string;
}

const Header = ({
  open,
  setOpen,
  activeItem,
  route,
  setRoute,
}: HeaderProps) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const { user } = useSelector((state: any) => state.auth);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const { data } = useSession();
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
    }
    if (data !== null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, userData, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${active} ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fix top-0 left-0 h-[80px] z-[80] border-b dark-border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    width={20}
                    height={20}
                    src={userData?.user.avatar ? userData?.user.avatar.url : avatar}
                    alt="avatar"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer object-cover"
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className=" dark:bg-slate-900  text-black dark:text-white fixed w-full h-screen top-0 left-0 z-[99999] ]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <>
                  <Image
                    width={20}
                    height={20}
                    src={userData?.user.avatar ? userData?.user.avatar.url : avatar}
                    alt="avatar"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer ml-[20px]"
                    style={{
                      border: activeItem === 5 ? "2px solid #ffc107" : "",
                    }}
                  />
                </>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer my-2 text-black dark:text-white"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright 2023 ELearning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verifycation}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
