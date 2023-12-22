import Image from "next/image";
import { useEffect, useState } from "react";
import avatarIcon from "../../../public/images/avatar.jpg";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

interface ProfileInfoProps {
  avatar: string | null;
  user: any;
}

const ProfileInfo = ({ avatar, user }: ProfileInfoProps) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [
    editProfile,
    { isSuccess: editProfileSuccess, error: editProfileError },
  ] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || editProfileSuccess) {
      setLoadUser(true);
      toast.success("Profile Update successfully!");
    }
    if (error || editProfileError) {
      console.log(error);
      toast.error("Profile Update failed!");
    }
  }, [isSuccess, editProfileError, error, editProfileSuccess]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name !== "") {
      editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            width={120}
            height={120}
            alt="avatar"
            className="object-cover w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] dark:bg-slate-900 bg-white rounded-full absolute right-2 bottom-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera
                size={20}
                className="z-1 text-black dark:text-white"
              />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
                readOnly
              />
            </div>
            <input
              type="submit"
              value="Update"
              className={`w-full 800px:w-[250px] h-[40px] border border[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
