"use client";

import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import Loader from "../loader/loader";
import LoaderButton from "../loader/loader-button";

interface EditHeroProps {}

const EditHero = ({}: EditHeroProps) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubtitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Here updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[500px] 1500px:w-[500px] 1100px:h-[300px] 1100px:w-[300px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]" />
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-0 z-10">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[10]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              className="hidden"
              onChange={handleUpdate}
            />
            <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
              <AiOutlineCamera className="dark:text-white text-[18px] text-dark cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="1000px:w-[40%] flex flex-col items-start 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] ml-[140px] justify-center">
          <textarea
            className="dark:text-white text-[#000000c7] resize-none text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[50px] font-[600] bg-transparent"
            placeholder="Improve Your Online Learing Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={3}
          />
          <br />
          <textarea
            className="dark:text-[#edfff4] font-Josefin text-[#000000ac] resize-none font-[600] text-[18px] 1500px:!w-[100%] 1500px:text-[20px] 1100px:!w-[74%] bg-transparent ml-[20px]"
            placeholder="We have 40k+ Online courses & 500k+ Online registered student. Find your desired Courses from them."
            value={subTitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={4}
          />
          <br />
          <br />
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
              ${
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? "!cursor-pointer !bg-[#42d383]"
                  : "!cursor-not-allowed"
              }
              !rounded absolute bottom-12 right-12
            `}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            {
              isLoading ? (<LoaderButton/>) : (<p className="dark:text-white text-black">Save</p>)
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
