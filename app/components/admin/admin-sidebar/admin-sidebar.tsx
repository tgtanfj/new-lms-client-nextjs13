"use client";

import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import {
  HomeOutlinedIcon,
  ArrowForwardIosicon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarchartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./icons";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import avatarDefault from "../../../../public/images/avatar.jpg";
import { useProSidebar } from "react-pro-sidebar";

interface itemsProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item = ({ title, to, icon, selected, setSelected }: itemsProps) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link href={to}/>}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // test
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setLogout(true);
  };

  return (
    <Box
    sx={{
      position: "sticky",
      display: "flex",
      height: "100vh",
      top: 0,
      bottom: 0,
      zIndex: 10000,
      "& .sidebar": {
        border: "none",
      },
      "& .menu-icon": {
        backgroundColor: "transparent !important",
      },
      "& .menu-item": {
        // padding: "5px 35px 5px 20px !important",
        backgroundColor: "transparent !important",
      },
      "& .menu-anchor": {
        color: "inherit !important",
        backgroundColor: "transparent !important",
      },
      "& .menu-item:hover": {
        color: `#868dfb !important`,
        backgroundColor: "transparent !important",
      },
      "& .menu-item.active": {
        color: `#6870fa !important`,
        backgroundColor: "transparent !important",
      },
    }}
    >
      <Sidebar
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: collapsed ? "0%" : "16%",
        }}
        breakPoint="md"
        backgroundColor={`${theme === "dark" ? "#1f2a40" : "f2f0f0"}`}
      >
        <Menu >
          <MenuItem
            icon={
              collapsed ? (
                <ArrowForwardIosicon onClick={() => collapseSidebar()} />
              ) : (
                <ArrowBackIosIcon
                  onClick={() => collapseSidebar()}
                />
              )
            }
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins dark:text-white text-black">
                    ELearning
                  </h3>
                </Link>
              </Box>
            )}
          </MenuItem>

          {!collapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                  className="w-[100px] h-[100px]"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  sx={{ m: "10px 0 0 0" }}
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{ m: "10px 0 0 0" }}
                  className="!text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
            >
              {!collapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
              sx={{ m: "15px 0 5px 20px" }}
            >
              {!collapsed && "Content"}
            </Typography>

            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 20px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!collapsed && "Customization"}
            </Typography>

            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 20px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!collapsed && "Controllers"}
            </Typography>

            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 20px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!collapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarchartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 20px" }}
              className="!text-[18px] text-black dark:text-white capitalize !font-[400]"
            >
              {!collapsed && "Extras"}
            </Typography>
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={logoutHandler}>
              <Item
                title="Exit Admin Page"
                to="/profile"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default AdminSidebar;
