import React from "react"
import userAuth from "./userAuth"
import { redirect } from "next/navigation"

const Protected = ({children}: {children: React.ReactNode}) => {
  const isAuthenticated = userAuth()
  
  return isAuthenticated ? children : redirect("/")
}

export default Protected