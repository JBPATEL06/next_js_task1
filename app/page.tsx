"use client"
import AddUserBtn from "@/componets/addUser";
import Invoice from "@/componets/invoice";
import ProfileTab from "@/componets/profileTab";
import SearchForm from "@/componets/searchForm";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isProfile,setProfileTab] = useState(true)
  
  return (
    <>
    <SearchForm />
    <AddUserBtn />
    {isProfile ? <ProfileTab /> : <Invoice /> }
    </>
  );

}