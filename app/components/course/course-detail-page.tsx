import { useGetCourseDetailsQuery } from "@/redux/features/courses/coureseApi";
import { useState } from "react";
import Loader from "../loader/loader";
import Heading from "@/app/utils/Heading";
import Header from "../header";
import Footer from "../footer/footer";
import CourseDetails from "./course-details";

interface CourseDetailPageProps {
  courseId: string;
}

const CourseDetailPage = ({ courseId }: CourseDetailPageProps) => {
  const { data, isLoading } = useGetCourseDetailsQuery(courseId);

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + " - ELearning"}
            description="ELearning is a platform for students to learn and get help from teachers"
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <CourseDetails data={data?.course}/>
          <Footer/>
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
