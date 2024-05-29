import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/jobs/*"]
}

const LinkedInJobContent = () => {
  const previousContentRef = useRef("")
  const observerRef = useRef(null)
  const getJobDescriptionElement = () => {
    console.log("====getJobDescriptionElement====")

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
    const siblingElement = getJobDescriptionElement()
    const newContent = siblingElement.textContent.trim()
    if (newContent.length > 0 && newContent !== previousContentRef.current) {
      console.log(newContent)
      previousContentRef.current = newContent
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
