import { useGetCourseDetailsQuery } from "@/redux/features/courses/coureseApi";
import { useEffect, useState } from "react";
import Loader from "../loader/loader";
import Heading from "@/app/utils/Heading";
import Header from "../header";
import Footer from "../footer/footer";
import CourseDetails from "./course-details";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";

interface CourseDetailPageProps {
  courseId: string;
}

const CourseDetailPage = ({ courseId }: CourseDetailPageProps) => {
  const { data, isLoading } = useGetCourseDetailsQuery(courseId);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

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
          {stripePromise && (
            <CourseDetails
              setRoute={setRoute}
              setOpen={setOpen}
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
