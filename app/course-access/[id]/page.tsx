"use client";

import CourseAccessContent from "@/app/components/admin/course/course-access-content";
import Loader from "@/app/components/loader/loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const CourseAccessPage = ({ params }: { params: any }) => {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseAccessContent courseId={id} user={data?.user} />
        </div>
      )}
    </>
  );
};

export default CourseAccessPage;
