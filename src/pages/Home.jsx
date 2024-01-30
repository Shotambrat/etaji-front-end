import React, { useState } from "react";
import archive from "./../assets/svg/archive-svgrepo-com.svg";
import Tasks from "../components/Tasks";
import Filter from "../components/Filter";
import CustomDrawer from "./CustomDrawer";

export default function Home() {
  const [filter, setFilter] = useState("today");
  const [full, setFull] = useState("pending");
  const [count, setCount] = useState(0);
  const [day, setDay] = useState("Сегодня");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const handleFullChange = (filter) => {
    setFull(filter);
  };

  return (
    <div className="absolute top-0 left-0 overflow-y-hidden w-screen min-h-screen flex justify-center bg-yellow-100">
      <div className="fixed top-6 left-12 h-[20px] w-[30px] max-md:left-6 max-md:top-3">
        <CustomDrawer />
      </div>
      <div className="absolute top-6 right-12 h-[20px] w-[30px] max-md:top-3">
        <Filter
          onFilterChange={handleFilterChange}
          onFullChange={handleFullChange}
        />
      </div>
      <div className="h-[auto] w-[800px]  mt-12">
        <div className="w-[auto] h-[100px] flex flex-col justify-between">
          <div className="ml-2">
            <h1 className="font-bold text-[2em]">{day}</h1>
          </div>
          <div className="flex items-center ml-5 mb-5">
            <img className="h-[20px]" src={archive} alt="svg" />
            <p className="text-lg text-center ml-2">{count} задач</p>
          </div>
        </div>
        <Tasks
          full={full}
          filter={filter}
          setCount={setCount}
          setDay={setDay}
          className="border-2 border-blue-700"
        />
      </div>
    </div>
  );
}
