"use client";

import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coureseApi";
import { useEffect, useState } from "react";
import CourseCard from "../course/course-card";

const Courses = () => {
  const { data, isLoading } = useGetUserAllCoursesQuery({});

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCourses(data?.courses);
    }
  }, [data]);

  return (
    <div className="mt-[100px]">
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black 800px:!leading-[60px] font-[700] tracking-tight">
          Expand Your Career {" "}
          <span className="text-transparent bg-clip-text text_animation">
            Opportunity
          </span>{" "}
          <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((course: any, index: number) => (
              <CourseCard course={course} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
