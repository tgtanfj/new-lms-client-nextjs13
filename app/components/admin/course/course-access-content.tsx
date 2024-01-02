"use client";

import { useGetCourseContentQuery } from "@/redux/features/courses/coureseApi";
import Loader from "../../loader/loader";
import Heading from "@/app/utils/Heading";
import { useState } from "react";
import CourseContentMedia from "./course-content-media";
import Header from "../../header";
import CourseContentList from "../../course/course-content-list";

interface CourseAccessContentProps {
  courseId: string;
  user: any;
}

const CourseAccessContent = ({ courseId, user }: CourseAccessContentProps) => {
  const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(courseId, {refetchOnMountOrArgChange: true});

  const data = contentData?.content;

  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="text-black dark:text-white w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title + " - ELearning"}
              description="ELearning is a platform for students to learn and get help from teachers"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                user={user}
                data={data}
                courseId={courseId}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseAccessContent;
