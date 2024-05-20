import React, { useState } from "react"

import type { CVData } from "~interfaces/CvData"

import "../style.css"

import icon from "../assets/icon.png"

const initialCvData: CVData = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  skills: [],
  experience: [],
  education: []
}

const MakeCv = () => {
  const [cvdata, setCvData] = useState<CVData>(initialCvData)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setCvData((prevCvData) => ({
      ...prevCvData,
      [name]: value
    }))
  }

  const handleSkillChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setCvData((prevCvData) => ({
      ...prevCvData,
      skills: prevCvData.skills.map((skill, i) =>
        i === index ? { ...skill, [name]: value } : skill
      )
    }))
  }

  const addSkill = () => {
    setCvData((prevCvData) => ({
      ...prevCvData,
      skills: [
        ...prevCvData.skills,
        {
          name: "",
          description: "",
        }
      ]
    }))
  }

  const addEducation = () => {
    setCvData((prevCvData) => ({
      ...prevCvData,
      education: [
        ...prevCvData.education,
        {
          degree: "",
          major: "",
          university: "",
          startDate: "", // Add startDate
          endDate: "", // Add endDate
          years: "" // Add years
        }
      ]
    }))
  }

  const addExperience = () => {
    setCvData((prevCvData) => ({
      ...prevCvData,
      experience: [
        ...prevCvData.experience,
        {
          title: "",
          company: "",
          years: "", // Add years
          startDate: "",
          endDate: "",
          description: ""
        }
      ]
    }))
  }

  const removeSkill = (index: number) => {
    setCvData((prevCvData) => {
      const newSkills = prevCvData.skills.filter((_, i) => i !== index);
      return { ...prevCvData, skills: newSkills };
    });
  };

  

  const handleExperienceChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setCvData((prevCvData) => ({
      ...prevCvData,
      experience: prevCvData.experience.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      )
    }))
  }

  const handleEducationChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setCvData((prevCvData) => ({
      ...prevCvData,
      education: prevCvData.education.map((edu, i) =>
        i === index ? { ...edu, [name]: value } : edu
      )
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("CV Data:", cvdata)
  }

  function removeExperience(index: number): void {
    setCvData((prevCvData) => {
      const newExperience = prevCvData.experience.filter((_, i) => i !== index);
      return { ...prevCvData, experience: newExperience };
    });
  }

  function removeEducation(index: number): void {
    setCvData((prevCvData) => {
      const newEducation = prevCvData.education.filter((_, i) => i !== index);
      return { ...prevCvData, education: newEducation };
    });
  }

  return (
    <div className="container mx-auto p-8">
      <img src={icon} alt="Icon" width={"48px"} className="block mx-auto" />
      <form
        onSubmit={handleSubmit}
        className="mt-12  border p-5 rounded-md shadow-md  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={cvdata.name}
              onChange={handleChange}
              className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6 "
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={cvdata.email}
              onChange={handleChange}
              className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={cvdata.phone}
              onChange={handleChange}
              className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="linkedin"
              className="block text-sm font-medium leading-6 text-gray-900">
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              placeholder="HyperLink"
              value={cvdata.linkedin}
              onChange={handleChange}
              className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
       

        <div className="mt-4">
         <div className="flex items-center w-full mt-2 mb-4">
            <span className="px-2 bg-white text-center font-bold text-xl  ">Education</span>
            <hr className="flex-grow border-gray-300 mt-1" />
          </div>
          {cvdata.education.map((edu, index) => (
            <div key={index} className="mb-4 border rounded p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`education-degree-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Degree
                  </label>
                  <input
                    type="text"
                    id={`education-degree-${index}`}
                    name="degree"
                    value={edu.degree}
                    onChange={(event) => handleEducationChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`education-major-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Major
                  </label>
                  <input
                    type="text"
                    id={`education-major-${index}`}
                    name="major"
                    value={edu.major}
                    onChange={(event) => handleEducationChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`education-university-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    University
                  </label>
                  <input
                    type="text"
                    id={`education-university-${index}`}
                    name="university"
                    value={edu.university}
                    onChange={(event) => handleEducationChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`education-start-date-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id={`education-start-date-${index}`}
                    name="startDate"
                    value={edu.startDate}
                    onChange={(event) => handleEducationChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`education-end-date-${index}`}
                    className="block text-gray-700 font-bold mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    id={`education-end-date-${index}`}
                    name="endDate"
                    value={edu.endDate}
                    onChange={(event) => handleEducationChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className=" px-2.5 py-1.5 text-sm  font-semibold  text-red-600 ring-gray-300 mt-2">
                    Remove Education
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="rounded-full w-40 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm  ring-gray-300 bg-violet-400 hover:shadow-md ">
            Add Education
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center w-full mt-2 mb-4">
            <span className="px-2 bg-white text-center font-bold text-xl  ">Experience</span>
            <hr className="flex-grow border-gray-300 mt-1" />
          </div>
          {cvdata.experience.map((exp, index) => (
            <div key={index} className="mb-4 border rounded p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`experience-title-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <input
                    type="text"
                    id={`experience-title-${index}`}
                    name="title"
                    value={exp.title}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`experience-company-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Company
                  </label>
                  <input
                    type="text"
                    id={`experience-company-${index}`}
                    name="company"
                    value={exp.company}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`experience-start-date-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id={`experience-start-date-${index}`}
                    name="startDate"
                    value={exp.startDate}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`experience-end-date-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    End Date
                  </label>
                  <input
                    type="date"
                    id={`experience-end-date-${index}`}
                    name="endDate"
                    value={exp.endDate}
                    onChange={(event) => handleExperienceChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  htmlFor={`experience-description-${index}`}
                  className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  id={`experience-description-${index}`}
                  name="description"
                  value={exp.description}
                  onChange={(event) => handleExperienceChange(index, event)}
                  className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                />
              </div>
              <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className=" px-2.5 py-1.5 text-sm  font-semibold  text-red-600 ring-gray-300 mt-2">
                    Remove Experience
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="rounded-full w-40 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm  ring-gray-300 bg-violet-400 hover:shadow-md ">
            Add Experience
          </button>
        </div>


        <div className="mt-4">
          <div className="flex items-center w-full mt-2 mb-4">
            <span className="px-2 bg-white text-center font-bold text-xl">Skills</span>
            <hr className="flex-grow border-gray-300 mt-1" />
          </div>
          {cvdata.skills.map((skill, index) => (
            <div key={index} className="mb-4 border rounded p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`skill-name-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                    Skill
                  </label>
                  <input
                    type="text"
                    id={`skill-name-${index}`}
                    name="name"
                    value={skill.name}
                    onChange={(event) => handleSkillChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`skill-start-date-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <input
                    type="text"
                    id={`skill-start-date-${index}`}
                    name="description"
                    value={skill.description}
                    onChange={(event) => handleSkillChange(index, event)}
                    className="lock w-full rounded-md border-0 py-1.5 px-2 font-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-violet-400 text-gray-700 sm:text-sm sm:leading-6 mt-[7px]"
                  />
                </div>
              </div>
              <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className=" px-2.5 py-1.5 text-sm  font-semibold  text-red-600 ring-gray-300 mt-2">
                    Remove Skill
              </button>
            </div>
             
          ))}
          <button
            type="button"
            onClick={addSkill}
            className="rounded-full w-40 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm  ring-gray-300 bg-violet-400 hover:shadow-md ">
            Add Skill
          </button>
         
        </div>

      

        

        <div className="mt-8 text-center">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm  font-semibold text-white hover:shadow-md  ring-inset hover:bg-black-800  w-1/3">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default MakeCv
