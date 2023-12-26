import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import LoaderButton from "../loader/loader-button";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading: editIsLoading, isSuccess, error }] =
    useEditLayoutMutation();

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
    if (isSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleCategoriesAdd = (id: string, value: any) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const addNewCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (category: any[]) => {
    return categories.some((q: any) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories &&
            categories.map((category: any, index: number) => (
              <div className="p-3">
                <div className="flex items-center w-full justify-center">
                  <input
                    className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                    value={category.title}
                    onChange={(e: any) =>
                      handleCategoriesAdd(category._id, e.target.value)
                    }
                    placeholder="Enter category title"
                  />
                  <AiOutlineDelete
                    className="dark:text-white text-black text-[18px] cursor-pointer"
                    onClick={() => {
                      setCategories((prevCategory: any) =>
                        prevCategory.filter((i: any) => i._id !== category._id)
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={addNewCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
            ${
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            } !rounded absolute bottom-12 right-12
          `}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
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

export default EditCategories;
