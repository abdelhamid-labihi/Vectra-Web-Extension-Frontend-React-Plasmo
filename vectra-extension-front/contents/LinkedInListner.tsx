import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/jobs/*"]
}

const LinkedInJobContent = () => {
  const previousTitleRef = useRef("")
  const previousCompanyRef = useRef("")
  const previousDescriptionRef = useRef("")

  const observerRef = useRef(null)

  console.log("==== LinkedInJobContent ====")

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

  const logJobContent = () => {
    const jobTitleElement = getJobTitleElement()
    const companyElement = getCompanyElement()
    const jobDescriptionElement = getJobDescriptionElement()

    const newTitle = jobTitleElement.textContent.trim()
    const newCompany = companyElement.textContent.trim()
    const newDescription = jobDescriptionElement.textContent.trim()

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
    }
  }

  const observeContentChanges = () => {
    const targetNode = document.body
    const config = { childList: true, subtree: true }

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    const observer = new MutationObserver(() => {
      logJobContent()
    })

    observer.observe(targetNode, config)
    observerRef.current = observer

    logJobContent()
  }

  useEffect(() => {
    observeContentChanges()

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}

export default LinkedInJobContent
