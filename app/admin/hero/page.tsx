"use client";

import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import EditHero from "@/app/components/Customization/edit-hero";
import { MyProSidebarProvider } from "@/app/components/admin/admin-sidebar/sidebarContext";
import DashboardHeader from "@/app/components/admin/dashboard-header";

const HeroMainPage = () => {
  return (
    <div className="text-black dark:text-white">
      <AdminProtected>
        <Heading
          title="ELearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programing,MERN,Redux,Machine Learning,ReactJS,NextJS,Front-end,nextjs course"
        />
        <div className="flex h-auto">
          <div className="1500px:w-[16%] w-1/5">
            <MyProSidebarProvider />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default HeroMainPage;
