import "../style.css"

import React, { useState } from "react"

import icon from "../assets/icon.png"

const ResumeMatcher = () => {
  const [progress, setProgress] = useState(50) // Initial progress is 50%
  const skills = ['Skill hellow word', 'Skill 2','Skill hellow word', 'Skill 2','Skill hellow word', 'Skill 2','Skill hellow word', 'Skill 2']; // Replace with actual skills
  const [isChecked, setIsChecked] = useState(skills.map(() => false));

  const r = 14
  const c = 2 * Math.PI * r
  const offset = c - (progress / 100) * c
  return (
    <div className="bg-black h-screen relative">
      <div className=" bg-white flex flex-col  absolute h-[565px] w-[300px] right-36 top-40 z-1000 shadow-md rounded-md ">
        <img
          src={icon}
          alt="Icon"
          width={"48px"}
          className="block mx-auto w-[35px]"
        />
        <hr className="mt-1"></hr>

        <div className="relative size-32 left-[85] top-2">
          <svg
            className="size-full"
            width="28"
            height="36"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              className="stroke-current text-gray-200 dark:text-neutral-700 "
              stroke-width="2"></circle>
            <g className="origin-center -rotate-90 transform">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                className="stroke-current text-indigo-500 dark:text-blue-500  "
                stroke-width="2"
                stroke-dasharray={c}
                stroke-dashoffset={offset}></circle>
            </g>
          </svg>

          <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span className="text-center text-xl font-bold text-indigo-500 dark:text-white ">
              {progress}%
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
            <div className="text-center font-medium justify-center align-item-center text-sml border w-75 rounded-lg py-2 mx-4 mt-2 bg-slate">
                Skills you missing to apply for this job 👇
            </div>
            <div className="flex flex-col gap-2 ms-5 max-h-56 overflow-auto  "> 
            {skills.map((skill, index) => (
                
                <div key={index} className="">
                <input id={`skill-checkbox-${index}`} type="checkbox" value="" className="w-4 h-3  border-gray-300 rounded accent-green-300"
                onChange={() => {
                    const newIsChecked = [...isChecked];
                    newIsChecked[index] = !newIsChecked[index];
                    setIsChecked(newIsChecked);
                  }}
                 />
                <label htmlFor={`skill-checkbox-${index}`} className={`ms-2 text-sm font-medium ${isChecked[index] ? 'text-green-500' : 'text-red-500'} dark:text-gray-300`}>{skill}</label>
                </div>
            ))}

             </div>
        </div>
            <div className="ms-5 mt-2">
            <input type="checkbox" value="" className="w-4 h-3  border-gray-300 rounded accent-indigo-300 text-white"></input>
            <label  className="ms-2 text-sm font-medium text-indigo-400">Enhance your experience </label>
            </div>

          
           
            <div className="p-6 fixed top-[620px] space-y-1 ">
            <h6 className="text-center font-medium">check what do you want to add </h6>
            <button className="rounded-sm px-2.5  bg-indigo-500  text-white text-sm font-semibold ring-inset hover:bg-black-800 py-3  w-64">
                Optimize your Cv 
            </button>
        </div>
       
      
      
        
      

           
      </div>
    </div>
  )
}

export default ResumeMatcher
