import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";

const FAQ = () => {
  const { data } = useGetHeroDataQuery("FAQ");

  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="dark:text-white text-black">
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
                      <p className="font-medium">{q.question}</p>
                      <span className="ml-6 flex-shrink-0 transition">
                        {activeQuestion === q._id ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {activeQuestion === q._id && (
                    <dd className="mt-2 pr-12">
                      <p className="text-base font-Poppins">{q.answer}</p>
                    </dd>
                  )}
                </div>
              ))}
          </dl>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
