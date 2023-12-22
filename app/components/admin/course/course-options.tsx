import { IoMdCheckmark } from "react-icons/io";

interface CourseOptionsProps {
  active: number;
  setActive: (active: number) => void;
}

const CourseOptions = ({ active, setActive }: CourseOptionsProps) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className={`w-full flex py-5`}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center relative
              ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"}       
          `}
          >
            <IoMdCheckmark className="text-[25px]" />
            {index !== options.length -1 && (
              <div
                className={`absolute h-[30px] w-1 bottom-[-100%]
                ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"}
              `}
              />
            )}
          </div>
          <h5
            className={`pl-3 text-[20px]
            ${
              active === index
                ? "dark:text-white text-black"
                : "dark:text-white text-black"
            }
          `}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
