import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import LoaderButton from "../loader/loader-button";
import Loader from "../loader/loader";

const EditFaq = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading: editIsLoading, isSuccess, error }] =
    useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: string, value: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: string, value: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        questions: "",
        answer: "",
      },
    ]);
  };

  // function to check if the FAQ arrays are changed or not
  const areQuestionsUnchanged = (
    originalQuestion: any[],
    newQuestion: any[]
  ) => {
    return JSON.stringify(originalQuestion) === JSON.stringify(newQuestion);
  };

  const isAnyQuestionEmpty = (questions: any) => {
    return questions.some((q: any) => q.question === "" || q.answer === "");
  };

  const handlerEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions &&
                questions.map((q: any) => (
                  <div
                    key={q._id}
                    className={`${
                      q._id !== questions[0]?._id && "border-t"
                    } border-gray-200 pt-6`}
                  >
                    <dt className="text-lg">
                      <button
                        className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        <input
                          placeholder={"Add your question..."}
                          className={`${styles.input} border-none`}
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(q._id, e.target.value)
                          }
                        />

                        <span className="ml-6 flex-shrink-0">
                          {q.active ? (
                            <HiMinus className="h-6 w-6" />
                          ) : (
                            <HiPlus className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {q.active && (
                      <dd className="mt-2 pr-12">
                        <input
                          className={`${styles.input} border-none`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder={"Add your answer..."}
                        />
                        <span className="ml-6 flex-shrink-0">
                          <AiOutlineDelete
                            className="dark:text-white text-black text-[18px] cursor-pointer"
                            onClick={() => {
                              setQuestions((prevQuestion) =>
                                prevQuestion.filter(
                                  (item) => item._id !== q._id
                                )
                              );
                            }}
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-dark text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>
          <div
            className={`${styles.button}
        !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
        ${
          areQuestionsUnchanged(data?.layout?.faq, questions) ||
          isAnyQuestionEmpty(questions)
            ? "!cursor-not-allowed"
            : "!cursor-pointer !bg-[#42d383]"
        }
        !rounded absolute bottom-12 right-12
      `}
            onClick={
              areQuestionsUnchanged(data?.layout?.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handlerEdit
            }
          >
            {editIsLoading ? (
              <LoaderButton />
            ) : (
              <p className="dark:text-white text-black">Save</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
