import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/jobs/*"]
}

const LinkedInJobContent = () => {
  let previousContent = ""

  const getJobDescriptionElement = () => {
    const h2Elements = document.querySelectorAll("h2")
    const targetElement = Array.from(h2Elements).find((h2) =>
      [
        "About the job",
        "À propos de l'offre d'emploi",
        "À propos de l’offre d’emploi"
      ].some((str) => h2.textContent.includes(str))
    )

    if (targetElement) {
      return targetElement.nextElementSibling
    }
  }

  const logJobContent = () => {
    const siblingElement = getJobDescriptionElement()
    const newContent = siblingElement.textContent.trim()
    if (newContent.length > 0 && newContent !== previousContent) {
      console.log(newContent)
      previousContent = newContent
    }
  }

  const observeContentChanges = () => {
    const siblingElement = getJobDescriptionElement()
    const config = { childList: true, subtree: true }

    const callback = (_mutationsList, _observer) => {
      logJobContent()
    }

    const observer = new MutationObserver(callback)
    observer.observe(siblingElement, config)

    logJobContent()

    return () => observer.disconnect()
  }

  useEffect(() => {
    observeContentChanges()
  }, [])

  return null
}

export default LinkedInJobContent
