import Image from "next/image";
import React from "react";
import avatarDefault from "../../../public/images/avatar.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

interface SidebarProfileProps {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: any;
}

const SidebarProfile = ({
  user,
  active,
  setActive,
  avatar,
  logoutHandler,
}: SidebarProfileProps) => {
  return (
    <div className="w-full">
      <div
        onClick={() => setActive(1)}
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
      >
        <Image
          height={20}
          width={20}
          alt="avatar"
          className="object-cover w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
        />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          My Account
        </h5>
      </div>
      <div
        onClick={() => setActive(2)}
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
      >
        <RiLockPasswordLine size={20}  />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          Change Password
        </h5>
      </div>
      <div
        onClick={() => setActive(3)}
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
      >
        <SiCoursera size={20}   />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          Enrolled Courses
        </h5>
      </div>
      {user.role === "admin" && (
        <Link
          href="/admin"
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
        >
          <MdOutlineAdminPanelSettings size={20}   />
          <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
            Admin Dashboard
          </h5>
        </Link>
      )}
      <div
        onClick={() => logoutHandler()}
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
      >
        <AiOutlineLogout size={20}   />
        <h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
