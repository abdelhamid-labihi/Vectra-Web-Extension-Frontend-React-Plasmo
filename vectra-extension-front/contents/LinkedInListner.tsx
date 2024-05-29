import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/jobs/*"]
}

const LinkedInJobContent = () => {
  const previousTitleRef = useRef("")
  const previousDescriptionRef = useRef("")
  const previousCompanyRef = useRef("")
  const observerRef = useRef(null)
  console.log("==== LinkedInJobContent ====")

  const getJobTitleElement = () => {
    let targetElement = document.getElementById("ember35")
    // check if the element is an anchor element
    if (targetElement && targetElement.tagName === "A") {
      return targetElement
    }
    targetElement = document.querySelector(
      ".job-details-jobs-unified-top-card__job-title h1"
    )
    return targetElement
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
    const jobDescriptionElement = getJobDescriptionElement()
    const newTitle = jobTitleElement.textContent.trim()
    const newDescription = jobDescriptionElement.textContent.trim()
    if (
      newDescription.length > 0 &&
      newDescription !== previousDescriptionRef.current &&
      newTitle !== previousTitleRef.current &&
      newTitle !== previousCompanyRef.current
    ) {
      console.log(newTitle)
      console.log(newDescription)
      previousDescriptionRef.current = newDescription
      previousTitleRef.current = newTitle
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
