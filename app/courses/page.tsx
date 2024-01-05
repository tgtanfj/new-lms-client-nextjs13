"use client";

import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coureseApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/loader/loader";
import Header from "../components/header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/course/course-card";

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");

  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title="ELearning - Admin"
              description="ELearning is a platform for students to learn and get help from teachers"
              keywords="Programing,MERN,Redux,Machine Learning,ReactJS,NextJS,Front-end,nextjs course"
            />
            <br />
            <div className="w-full flex items-center flex-wrap text-white">
              <div
                onClick={() => setCategory("All")}
                className={`h-[35px] ${
                  category === "All" ? "bg-[#46ccbf]" : "bg-[#32968e]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      onClick={() => setCategory(item.title)}
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[#46ccbf]"
                          : "bg-[#32968e]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                    >
                      {item?.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "Opps, no courses found!"
                  : "No courses found in this category. Please try another one!"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((course: any, index: number) => (
                  <CourseCard course={course} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
