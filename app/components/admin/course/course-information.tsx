// need learn: drag drop files

import { styles } from "@/app/styles/style";
import { useState } from "react";

interface CourseInformationProps {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInformation = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}: CourseInformationProps) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with Nextjs 13"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className={`${styles.input} !h-min !py-2`}
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              name=""
              type="number"
              value={courseInfo.price}
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className={`${styles.input} `}
              placeholder="0.00$"
              id="price"
            />
          </div>
          <div className="w-[45%]">
            <label className={`${styles.label} w-[50%]`}>
              Estimated Price (optional)
            </label>
            <input
              name=""
              type="number"
              value={courseInfo.estimatedPrice}
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className={`${styles.input} `}
              placeholder="0.00$"
              id="price"
            />
          </div>
        </div>
        <br />
        <div>
          <label className={`${styles.label}`} htmlFor="email">
            Course Tags
          </label>
          <input
            name=""
            type="text"
            value={courseInfo.tags}
            required
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            className={`${styles.input} `}
            placeholder="Nextjs 13, Reactjs, Socket io, tailwind css, MERN,..."
            id="tags"
          />
        </div>
        <br />
        <div className="w-full flex justify-between ">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              name=""
              type="text"
              value={courseInfo.level}
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={`${styles.input} `}
              placeholder="Beginner/Intermerdiate/Expert"
              id="level"
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Demo Url</label>
            <input
              name=""
              type="text"
              value={courseInfo.demoUrl}
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              className={`${styles.input} `}
              placeholder="eer74fd"
              id="demoUrl"
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center
              ${dragging ? "bg-blue-500" : "bg-transparent"}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo?.thumbnail}
                alt="Course thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span>Drag and drop your thumbnail here or click to browse</span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
      <br />
      <br />
    </div>
  );
};

export default CourseInformation;
