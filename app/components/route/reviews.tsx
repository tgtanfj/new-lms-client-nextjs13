import { styles } from "@/app/styles/style";
import Image from "next/image";
import ReviewCard from "../review/review-card";

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambrige University",
    comment:
      "I loved the practical approach of this course. It helped me apply concepts in real-world projects.",
  },
  {
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Software Engineer | Google",
    comment:
      "I loved the practical approach of this course. It helped me apply concepts in real-world projects.",
  },
  {
    name: "Alex Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    profession: "Frontend Developer | Facebook",
    comment:
      "The content is well-structured, and the instructor explains complex topics in a way that's easy to understand.",
  },
  {
    name: "Sophie Williams",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "UX Designer | Adobe",
    comment:
      "As a designer, I found the course valuable not just for developers but also for understanding the development side of things.",
  },
  {
    name: "Daniel Lee",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    profession: "Freelance Web Developer",
    comment:
      "This course exceeded my expectations. The hands-on projects were challenging and fun.",
  },
  {
    name: "Olivia Smith",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    profession: "Product Manager | Shopify",
    comment:
      "The course covers a wide range of topics, and the instructor's teaching style makes it easy to stay engaged.",
  },
  {
    name: "Ava White",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    profession: "UI/UX Designer | Netflix",
    comment:
      "I appreciated the emphasis on design principles in this course. It added a valuable perspective to my skill set.",
  },
  {
    name: "Chloe Adams",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    profession: "Frontend Developer | Twitter",
    comment:
      "The course materials are up-to-date, and the practical exercises helped reinforce key concepts. Highly recommended!",
  },
];

const Reviews = () => {
  return (
    <div className="text-white mt-[100px] dark:text-white w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            alt="business"
            src={require("../../../public/images/image2.png")}
            width={600}
            height={600}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{" "}
            <span className="text-transparent bg-clip-text text_animation">
              Our Strength
            </span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label}`}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </p>
        </div>
      </div>
      <br />
        <br />
        {/* md:[&>*:nth-child(6)]:!mt-[-40px] */}
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 ">
          {reviews && reviews.map((review:any, index: number) => (
            <ReviewCard
              review={review}
              key={index}
            />
          ))}
        </div>
    </div>
  );
};

export default Reviews;
