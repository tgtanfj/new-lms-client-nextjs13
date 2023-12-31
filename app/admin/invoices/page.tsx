"use client";

import { MyProSidebarProvider } from "@/app/components/admin/admin-sidebar/sidebarContext";
import DashboardHeader from "@/app/components/admin/dashboard-header";
import AllInvoices from "@/app/components/admin/invoice/all-invoices";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";

interface AllInvoicesMainPageProps {
  isDashboard: boolean;
}

const AllInvoicesMainPage = ({ isDashboard }: AllInvoicesMainPageProps) => {
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
            <AllInvoices isDashboard={isDashboard} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default AllInvoicesMainPage;
