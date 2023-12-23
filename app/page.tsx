'use client'

import React, {FC, useState} from "react"
import Heading from "./utils/Heading";
import Header from "./components/header";
import Hero from "./components/hero";

interface Props {

}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [route,setRoute] = useState("Login")

  return (
    <div>
      <Heading
        title="ELearning"
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
      <Hero/>
    </div>
  )
}

export default Page;