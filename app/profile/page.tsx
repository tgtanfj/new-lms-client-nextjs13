"use client";

import { useState } from "react";
import Header from "../components/header";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Profile from "../components/profile/page";
import { useSelector } from "react-redux";
import Footer from "../components/footer/footer";

interface ProfilePageProps {}

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen text-black dark:text-white">
      <Protected>
        <Heading
          title={`${user?.name} profile - ELearning`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programing,MERN,Redux,Nextjs13,Reactjs,LMS,Coding,Front-end"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
        <Footer/>
      </Protected>
    </div>
  );
};

export default ProfilePage;
