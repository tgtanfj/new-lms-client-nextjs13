"use client";

import { useEffect, useState } from "react";
import CourseInformation from "./course-information";
import CourseOptions from "./course-options";
import CourseData from "./course-data";
import CourseContent from "./course-content";
import CourseReview from "./course-review";
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesAdminOnlyQuery,
} from "@/redux/features/courses/coureseApi";
import toast from "react-hot-toast";
import { redirect, useParams } from "next/navigation";

interface EditCourseProps {
  courseId: string;
}

const EditCourse = ({ courseId }: EditCourseProps) => {
  const {  data, refetch } = useGetAllCoursesAdminOnlyQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [editCourse, {isSuccess, error, isLoading}] = useEditCourseMutation()

  const editCourseData =
    data && data.courses.find((course: any) => course._id === courseId);

  const [active, setActive] = useState(0);
  const [courseData, setCourseData] = useState({});
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentdata] = useState([
    {
      videoUrl: "",
      title: "",
      descriptions: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentdata(editCourseData.courseData);
    }
  }, [editCourseData]);

  const handleSubmit = async () => {
    // format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    // format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.descriptions,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    // prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContentData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;

    await editCourse({data, id: editCourseData?._id})
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            setPrerequisites={setPrerequisites}
            prerequisites={prerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentdata}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CourseReview
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            courseData={courseData}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
