import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/course-player";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import defaultAvatar from "../../../../public/images/avatar.jpg";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coureseApi";
import LoaderButton from "../../loader/loader-button";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

interface CourseContentMediaProps {
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  data: any;
  courseId: string;
  user: any;
  refetch: any;
}

const CourseContentMedia = ({
  activeVideo,
  setActiveVideo,
  data,
  courseId,
  user,
  refetch,
}: CourseContentMediaProps) => {
  const [
    addNewQuestion,
    { isLoading: questionCreationLoading, error, isSuccess },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isLoading: answerCreationLoading,
      error: answerCreationError,
      isSuccess: answerCreationSuccess,
    },
  ] = useAddAnswerInQuestionMutation();
  const [
    addReviewInCourse,
    { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewLoading },
  ] = useAddReviewInCourseMutation({});
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    courseId,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addReplyInReview,
    {
      isSuccess: addReplySuccess,
      error: addReplyError,
      isLoading: addReplyLoading,
    },
  ] = useAddReplyInReviewMutation();

  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const course = courseData?.course;

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handlequestionSubmit = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: courseId,
        contentId: data[activeVideo]?._id,
      });
    }
  };

  const handleAnswerSubmit = async () => {
    await addAnswerInQuestion({
      answer,
      courseId,
      questionId,
      contentId: data[activeVideo]?._id,
    });
    setAnswer("");
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review, courseId, rating });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!addReplyLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({
          comment: reply,
          courseId,
          reviewId,
        });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Add question successfully");
      socketId.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user?._id,
      });
    }
    if (error) {
      if ("data" in error) {
        toast.error("Add question failed");
        const errorMes = error as any;
        toast.error(errorMes.data.message);
      }
    }
    if (answerCreationSuccess) {
      setAnswer("");
      refetch();
      toast.success("Add answer successfully");
      if(user.role !== "admin") {
        socketId.emit("notification", {
          title: `New Reply Received`,
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user?._id,
        });
      }
    }
    if (answerCreationError) {
      if ("data" in answerCreationError) {
        toast.error("Add answer failed");
        const errorMes = answerCreationError as any;
        toast.error(errorMes.data.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Add review successfully");
      socketId.emit("notification", {
        title: `New Review Received`,
        message: `You have a new review in ${data[activeVideo].title}`,
        userId: user?._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        toast.error("Add review failed");
        const errorMes = reviewError as any;
        toast.error(errorMes.data.message);
      }
    }
    if (addReplySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Add reply successfully");
    }
    if (addReplyError) {
      if ("data" in addReplyError) {
        toast.error("Add reply failed");
        const errorMes = addReplyError as any;
        toast.error(errorMes.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerCreationSuccess,
    answerCreationError,
    reviewError,
    reviewSuccess,
    addReplySuccess,
    addReplyError,
  ]);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          }`}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[0.8]"
          }`}
        >
          <AiOutlineArrowRight className="mr-2" />
          Next Lesson
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resourses", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index && "text-[#32968e]"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 ">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div key={index} className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && item.title + " :"}
              </h2>
              <Link
                target="_blank"
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </Link>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full w-[50px] h-[50px] object-cover"
              src={user.avatar ? user?.avatar?.url : defaultAvatar}
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={3}
              placeholder="Write your question"
              className="resize-none outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={
                questionCreationLoading ? () => {} : handlequestionSubmit
              }
            >
              {questionCreationLoading ? (
                <LoaderButton />
              ) : (
                <p className="dark:text-white text-black">Submit</p>
              )}
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]" />
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
              questionId={questionId}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-full w-[50px] h-[50px] object-cover"
                    src={user.avatar ? user?.avatar?.url : defaultAvatar}
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500]">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            size={25}
                            className="mr-1 cursor-pointer"
                            onClick={() => setRating(i)}
                            color="rgb(246,186,0)"
                            onMouseEnter={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                            onMouseEnter={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={3}
                      placeholder="Write your comment..."
                      className="resize-none outline-none bg-transparent  border border-[#ffffff57] 800px:w-full p-2 rounded w-[85%] 800px:text-[18px] font-Poppins"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    onClick={reviewLoading ? () => {} : handleReviewSubmit}
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewLoading && "cursor-not-allowed"
                    }`}
                  >
                    {reviewLoading ? (
                      <LoaderButton />
                    ) : (
                      <p className="dark:text-white text-black">Submit</p>
                    )}
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]" />
            <div className="w-full">
              {(course?.reviews && [...course?.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div key={index} className="w-full my-5">
                    <div className="w-full flex">
                      <div>
                        <Image
                          width={50}
                          height={50}
                          alt="avatar"
                          className="rounded-full w-[50px] h-[50px] object-cover"
                          src={user.avatar ? user?.avatar?.url : defaultAvatar}
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user?.name}</h1>
                        <Ratings rating={item?.rating} />
                        <p>{item?.comment}</p>
                        <small className="dark:text-[#ffffff83] text-[#00000096]">
                          {format(item?.createdAt)}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && item.commentReplies.length === 0 && (
                      <span
                        onClick={() => {
                          setIsReviewReply(true), setReviewId(item?._id);
                        }}
                        className={`${styles.label} 800px:pl-14 !dark:text-[#ffffff83] !text-[#00000096] cursor-pointer `}
                      >
                        Add Reply
                      </span>
                    )}
                    {isReviewReply && reviewId === item._id && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          placeholder="Enter your reply..."
                          className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-black p-[5px] w-[95%]"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1"
                          onClick={handleReviewReplySubmit}
                        >
                          {addReplyLoading ? (
                            <LoaderButton />
                          ) : (
                            <p className="dark:text-white text-black">Submit</p>
                          )}
                        </button>
                      </div>
                    )}
                    {item?.commentReplies?.map((i: any, index: number) => (
                      <div key={index} className="w-full flex 800px:ml-16 my-5">
                        <div className="w-[50px] h-[50px]">
                          <Image
                            width={50}
                            height={50}
                            alt="avatar"
                            className="rounded-full w-[50px] h-[50px] object-cover"
                            src={
                              i?.user.avatar
                                ? i?.user?.avatar?.url
                                : defaultAvatar
                            }
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i?.user?.name}</h5>
                            {i.user.role === "admin" && (
                              <VscVerifiedFilled className="text-[#548cf7] ml-2" />
                            )}
                          </div>
                          <p>{i.comment}</p>
                          <small className="dark:text-[#ffffff83] text-[#00000096]">
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

interface CommentReplyProps {
  data: any;
  activeVideo: any;
  answer: any;
  setAnswer: any;
  handleAnswerSubmit: any;
  user: any;
  setQuestionId: any;
  answerCreationLoading: any;
  questionId:any
}

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
  questionId
}: CommentReplyProps) => {
  return (
    <div>
      <>
        <div className="w-full my-3">
          {data[activeVideo]?.questions.map((question: any, index: number) => (
            <CommentItem
              key={index}
              data={data}
              activeVideo={activeVideo}
              question={question}
              setAnswer={setAnswer}
              index={index}
              answer={answer}
              setQuestionId={setQuestionId}
              handleAnswerSubmit={handleAnswerSubmit}
              answerCreationLoading={answerCreationLoading}
              questionId={questionId}
            />
          ))}
        </div>
      </>
    </div>
  );
};

interface CommentItemProps {
  data: any;
  activeVideo: any;
  question: any;
  index: any;
  answer: any;
  setQuestionId: any;
  handleAnswerSubmit: any;
  setAnswer: any;
  answerCreationLoading: any;
  questionId:any
}

const CommentItem = ({
  data,
  activeVideo,
  question,
  index,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
  questionId
}: CommentItemProps) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full w-[50px] h-[50px] object-cover"
              src={
                question?.user?.avatar
                  ? question?.user?.avatar?.url
                  : defaultAvatar
              }
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{question?.user.name}</h5>
            <p>{question?.question}</p>
            <small className="dark:text-[#ffffff83] text-[#00000096]">
              {format(question?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(question?._id);
            }}
            className="800px:pl-16 dark:text-[#ffffff83] text-[#00000096] cursor-pointer mr-2"
          >
            {!replyActive
              ? question?.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Reply"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer dark:text-[#ffffff83] text-[#00000096]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-[#00000096]">
            {question.questionReplies.length}
          </span>
        </div>
        {replyActive && questionId === question._id && (
          <>
            {question?.questionReplies.map((item: any, index:number) => (
              <div key={index} className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                <div>
                  <Image
                    width={50}
                    height={50}
                    alt="avatar"
                    className="rounded-full w-[50px] h-[50px] object-cover"
                    src={
                      question?.user?.avatar
                        ? question?.user?.avatar?.url
                        : defaultAvatar
                    }
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{question?.user?.name}</h5>
                    {question.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#548cf7] ml-2" />
                    )}
                  </div>
                  <p>{item?.answer}</p>
                  <small className="dark:text-[#ffffff83] text-[#00000096]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter your reply..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`dark:text-white text-black block 800px:ml-16 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] ${
                    answer === 0 || answerCreationLoading
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                />
                {answer !== "" && (
                  <button
                    type="submit"
                    className="absolute right-0 bottom-1"
                    onClick={
                      answerCreationLoading ? () => {} : handleAnswerSubmit
                    }
                    disabled={answer === "" || answerCreationLoading}
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
