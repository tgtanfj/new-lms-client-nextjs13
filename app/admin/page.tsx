"use client";

import AdminProtected from "../hooks/adminProtected";
import Heading from "../utils/Heading";
import { MyProSidebarProvider } from "../components/admin/admin-sidebar/sidebarContext";
import DashboardHero from "../components/admin/dashboard-hero";

const AdminMainPage = () => {
  return (
    <div className="text-black dark:text-white">
      <AdminProtected>
        <Heading
          title="ELearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programing,MERN,Redux,Machine Learning,ReactJS,NextJS,Front-end,nextjs course"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <MyProSidebarProvider/>
          </div>
          <div className="w-[85%] ml-1">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default AdminMainPage;
