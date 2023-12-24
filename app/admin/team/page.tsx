'use client'

import { MyProSidebarProvider } from "@/app/components/admin/admin-sidebar/sidebarContext";
import DashboardHero from "@/app/components/admin/dashboard-hero";
import AllUsers from "@/app/components/admin/users/all-users";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";

const UserTeamPage = () => {
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
            <DashboardHero />
            <AllUsers isTeam={true}/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default UserTeamPage;
