"use client";

import { MyProSidebarProvider } from "@/app/components/admin/admin-sidebar/sidebarContext";
import Heading from "@/app/utils/Heading";
import CreateCourse from "@/app/components/admin/course/create-course";
import DashboardHeader from "@/app/components/admin/dashboard-header";
import { useEffect, useState } from "react";

const CreateCourseMainPage = () => {
  return (
    <div className="text-dark dark:text-white">
      <Heading
        title="ELearing - Admin"
        keywords="Programing,MERN,Redux,Machine Learning,ReactJS,NextJS,Front-end,nextjs course"
        description="ELearning is a platform for students to learn and get help from teachers"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <MyProSidebarProvider />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default CreateCourseMainPage;
