'use client'

import { MyProSidebarProvider } from "@/app/components/admin/admin-sidebar/sidebarContext"
import AllCourses from "@/app/components/admin/course/all-courses"
import DashboardHero from "@/app/components/admin/dashboard-hero"
import AdminProtected from "@/app/hooks/adminProtected"
import Heading from "@/app/utils/Heading"

const CoursesMainPage = () => {
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
            <MyProSidebarProvider/>
          </div>
          <div className="w-[85%] ml-1">
            <DashboardHero />
            <AllCourses/>
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default CoursesMainPage