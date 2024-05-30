import { config as reactSpringConfig } from "@react-spring/web"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"
import { Gauge } from "react-circular-gauge"

import { sendToBackground } from "@plasmohq/messaging"

import type {
  RequestBody,
  ResponseBody
} from "~background/messages/suggest_skills"

import icon from "../assets/icon.png"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/jobs/*"]
}

export type Skills = {
  technical_skills_present: string[]
  technical_skills_missing: string[]
  soft_skills_present: string[]
  soft_skills_missing: string[]
}

const LinkedInJobContent = () => {
  const previousTitleRef = useRef("")
  const previousCompanyRef = useRef("")
  const previousDescriptionRef = useRef("")
  const [skills, setSkills] = useState<Skills>({
    technical_skills_present: [],
    technical_skills_missing: [],
    soft_skills_present: [],
    soft_skills_missing: []
  })
  const observerRef = useRef(null)
  const [checkedTechnicalSkills, setCheckedTechnicalSkills] = useState<any>({})
  const [checkedSoftSkills, setCheckedSoftSkills] = useState<any>({})

  const [arcColor, setArcColor] = useState("#ff3600")

  console.log("==== LinkedInJobContent ====")

  const [progress, setProgress] = useState(0)

  const getJobTitleElement = () => {
    let targetElement = document.getElementById("ember35")

    if (targetElement && targetElement.tagName === "A") {
      return targetElement
    }
    targetElement = document.querySelector(
      ".job-details-jobs-unified-top-card__job-title h1"
    )
    if (targetElement) {
      return targetElement
    }
  }

  const getCompanyElement = () => {
    const companyNameElement = document.querySelector(
      ".job-details-jobs-unified-top-card__primary-description-without-tagline a"
    )
    if (companyNameElement) {
      return companyNameElement
    }
  }

  const getJobDescriptionElement = () => {
    const h2Elements = document.querySelectorAll("h2")
    const targetElement = Array.from(h2Elements).find((h2) =>
      ["About the job", "À propos de l’offre d’emploi"].some((str) =>
        h2.textContent.includes(str)
      )
    )

    if (targetElement) {
      return targetElement.nextElementSibling
    }
  }

  const getJobInformation = async () => {
    const jobTitleElement = getJobTitleElement()
    const companyElement = getCompanyElement()
    const jobDescriptionElement = getJobDescriptionElement()

    const newTitle = jobTitleElement?.textContent.trim()
    const newCompany = companyElement?.textContent.trim()
    const newDescription = jobDescriptionElement?.textContent.trim()

    if (!newTitle || !newCompany || !newDescription) {
      return
    }

    if (
      newTitle.length > 0 &&
      newTitle !== previousTitleRef.current &&
      newCompany.length > 0 &&
      newCompany !== previousCompanyRef.current &&
      newDescription.length > 0 &&
      newDescription !== previousDescriptionRef.current
    ) {
      console.log(newTitle)
      console.log(newCompany)
      console.log(newDescription)
      previousTitleRef.current = newTitle
      previousCompanyRef.current = newCompany
      previousDescriptionRef.current = newDescription

      await sendJobInformation(newTitle, newCompany, newDescription)
    }
  }

  const observeContentChanges = () => {
    const targetNode = document.body
    const config = { childList: true, subtree: true }

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new MutationObserver(() => {
      getJobInformation()
    })

    observer.observe(targetNode, config)
    observerRef.current = observer

    getJobInformation()
  }

  const getResumeScore = () => {
    const {
      technical_skills_present,
      technical_skills_missing,
      soft_skills_present,
      soft_skills_missing
    } = skills

    if (
      !technical_skills_present ||
      !technical_skills_missing ||
      !soft_skills_present ||
      !soft_skills_missing
    )
      return 0

    const presentSkillsCount =
      technical_skills_present.length + soft_skills_present.length
    const missingSkillsCount =
      technical_skills_missing.length + soft_skills_missing.length

    return (
      (presentSkillsCount / (presentSkillsCount + missingSkillsCount)) * 100
    )
  }

  const sendJobInformation = async (
    job_title: string,
    company: string,
    job_description: string
  ) => {
    const resume = await chrome.storage.local.get("resume")
    const first_name = resume.resume.given_names[0].value
    // const last_name = resume.resume.surnames[0].value
    // const username = `${first_name}_${last_name}`
    console.log(first_name)

    const username = first_name
    console.log(resume)
    console.log(username)

    const resp = (await sendToBackground<RequestBody, ResponseBody>({
      name: "suggest_skills",
      body: { job_title, company, job_description, username }
    })) as unknown as { message: Skills & { match: number } }
    console.log(resp)

    if (resp.message) {
      if (resp.message.match) {
        delete resp.message.match
        setSkills(resp.message)
      }
    }
  }

  useEffect(() => {
    observeContentChanges()

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    const score = getResumeScore()
    // const score = 85
    setProgress(score)
    if (score >= 70) {
      setArcColor("#00ff8b")
    } else if (score >= 40) {
      setArcColor("#ffd800")
    } else {
      setArcColor("#ff0000")
    }
  }, [skills])

  const handleTechnicalSkillToggle = (skill) => {
    setCheckedTechnicalSkills((prevCheckedSkills) => ({
      ...prevCheckedSkills,
      [skill]: !prevCheckedSkills[skill]
    }))
  }
  const handleSoftSkillToggle = (skill) => {
    setCheckedSoftSkills((prevCheckedSkills) => ({
      ...prevCheckedSkills,
      [skill]: !prevCheckedSkills[skill]
    }))
  }

  const upgradeResume = async (optimise: boolean) => {
    const technical_skills = Object.keys(checkedTechnicalSkills)
      .filter((skill) => checkedTechnicalSkills[skill])
      .concat(skills.technical_skills_present)

    const soft_skills = Object.keys(checkedSoftSkills)
      .filter((skill) => checkedSoftSkills[skill])
      .concat(skills.soft_skills_present)

    const body = JSON.stringify({
      technical_skills,
      soft_skills,
      enhance: optimise
    })
    console.log(body)

    const resume = await chrome.storage.local.get("resume")
    const first_name = resume.resume.given_names[0].value

    // const response = await fetch(
    //   `https://vectra-backend-spring.issaminu.com/resume/enhance?username=${first_name}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body
    //   }
    // )

    // console.log(response)
  }

  if (!progress || !skills) return null
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20 + "px",
        right: 20 + "px",
        background: "white",
        borderRadius: 4,
        paddingTop: 16,
        paddingBottom: 6,
        minWidth: 250,
        maxHeight: 1000,
        overflowY: "auto",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center mx-auto space-x-2">
          <img src={icon} alt="Icon" width={"27px"} />
          <p className="mt-1 text-3xl font-bold text-gray-700">Vectra AI</p>
        </div>

        <div className="relative flex flex-col items-center justify-center w-44 h-fit min-h-fit top-2">
          <div className="flex justify-center mt-8 size-32">
            <Gauge
              value={progress}
              minValue={0}
              maxValue={100}
              animated={true}
              arcColor={arcColor}
              trackColor="#f0e7f0"
              startAngle={40}
              arcWidth={0.3}
              trackWidth={0.4}
              endAngle={320}
              springConfig={reactSpringConfig.stiff}
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-center text-gray-700">
            Match Score
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="items-center justify-center py-2 mx-4 mt-4 text-lg font-medium text-center text-gray-400 w-75">
            The following skills are required for this position
          </div>
          <div className="flex flex-col gap-2 overflow-auto ms-5 max-h-[60rem]">
            {skills.technical_skills_present.length > 0 ? (
              <div>
                <h3 className="font-semibold text-gray-600">
                  Present Technical Skills
                </h3>
                <div className="flex flex-col mt-2 mb-4 space-y-1">
                  {skills.technical_skills_present.map((skill, index) => (
                    <span className="flex items-center h-6 pl-1 pr-2 font-semibold text-gray-600 bg-gray-100 rounded-md w-fit">
                      <span className="mr-1 text-xs">✔️</span> {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            {skills.technical_skills_missing.length > 0 ? (
              <div>
                <h3 className="font-semibold text-gray-600">
                  Missing Technical Skills
                </h3>
                <div className="flex flex-col mt-2 mb-4 space-y-1">
                  {skills.technical_skills_missing.map((skill, index) => (
                    <button
                      key={index}
                      className={`flex items-center h-6 pl-2 pr-2 font-semibold text-gray-600 w-fit bg-gray-100 rounded-md ${
                        checkedTechnicalSkills[skill] ? "bg-slate-300" : ""
                      }`}
                      onClick={() => handleTechnicalSkillToggle(skill)}>
                      <span className="mr-2 text-xs">
                        {checkedTechnicalSkills[skill] ? "☑️" : "⬜️"}
                      </span>{" "}
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-gray-600">
                  ✅ No Missing Technical Skills
                </h3>
              </div>
            )}
            {skills.soft_skills_present.length > 0 ? (
              <div>
                <h3 className="font-semibold text-gray-600">
                  Present Soft Skills
                </h3>
                <div className="flex flex-col mt-2 mb-4 space-y-1">
                  {skills.soft_skills_present.map((skill, index) => (
                    <span className="flex items-center h-6 pl-1 pr-2 font-semibold text-gray-600 bg-gray-100 rounded-md w-fit">
                      <span className="mr-1 text-xs">✔️</span> {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            {skills.soft_skills_missing.length > 0 ? (
              <div>
                <h3 className="font-semibold text-gray-600">
                  Missing Soft Skills
                </h3>
                <div className="flex flex-col mt-2 mb-4 space-y-1">
                  {skills.soft_skills_missing.map((skill, index) => (
                    <button
                      key={index}
                      className={`flex items-center h-6 pl-2 pr-2 font-semibold text-gray-600 bg-gray-100 rounded-md w-fit ${
                        checkedSoftSkills[skill] ? "bg-slate-300" : ""
                      }`}
                      onClick={() => handleSoftSkillToggle(skill)}>
                      <span className="mr-2 text-xs">
                        {checkedSoftSkills[skill] ? "☑️" : "⬜️"}
                      </span>{" "}
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-gray-600">
                  ✅ No Missing Soft Skills
                </h3>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full p-6 space-y-2">
          <button
            className="rounded-lg px-2.5 py-2 bg-indigo-100  text-indigo-800 font-semibold hover:bg-indigo-200 w-full"
            onClick={() => {
              upgradeResume(false)
            }}>
            Generate Tailored CV
          </button>
          <button
            className="w-full px-4 py-3 text-lg font-bold text-white transition-transform duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-700 hover:to-purple-700 hover:scale-105"
            onClick={() => {
              upgradeResume(true)
            }}>
            👑 Generate Tailored + Optimized CV
          </button>
        </div>
      </div>
    </div>
  )
}

export default LinkedInJobContent
