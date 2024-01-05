"use client";

import { useState } from "react";
import Header from "../components/header";
import Heading from "../utils/Heading";
import About from "./about";
import Footer from "../components/footer/footer";

const AboutPage = () => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(2)
  const [route, setRoute] = useState("Login")

  return (
    <div>
      <Heading
        title="About us - ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programing,MERN,Redux,Machine Learning,ReactJS,NextJS,Front-end,nextjs course"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <About/>
      <Footer/>
    </div>
  );
};

export default AboutPage;
