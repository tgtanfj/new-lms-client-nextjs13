"use client";

import EditCategories from "@/app/components/Customization/edit-categories";
import { MyProSidebarProvider } from "@/app/components/admin/admin-sidebar/sidebarContext";
import DashboardHeader from "@/app/components/admin/dashboard-header";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";

const CategoriesMainPage = () => {
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
          <div className="w-[85%] ml-1">
            <DashboardHeader />
            <EditCategories />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default CategoriesMainPage;
