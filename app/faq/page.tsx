"use client";

import { useState } from "react";
import Header from "../components/header";
import Heading from "../utils/Heading";
import Footer from "../components/footer/footer";
import FAQ from "../components/faq/faq";

const FaqPage = () => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(4)
  const [route, setRoute] = useState("Login")

  return (
    <div className="min-h-screen">
      <Heading
        title="FAQ - ELearning"
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
      <FAQ/>
      <Footer/>
    </div>
  );
};

export default FaqPage;
