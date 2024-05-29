import type { PlasmoMessaging } from "@plasmohq/messaging"

export type RequestBody = {
  job_title: string
  company: string
  job_description: string
}

export type ResponseBody = {
  message: string
}

const handler: PlasmoMessaging.MessageHandler<
  RequestBody,
  ResponseBody
> = async (req, res) => {
  try {
    console.log("Sending job information to background script")
    const { job_title, company, job_description } = req.body

    const response = await fetch(
      "https://vectra-backend-ai.issaminu.com/suggest_skills",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          job_title,
          company,
          job_description,
          skills: [
            "Java",
            "Python",
            "C/C++",
            "SQL",
            "JavaScript",
            "TypeScript",
            "HTML/CSS",
            "PHP"
          ]
        })
      }
    )
    if (response.ok) {
      const result = await response.json()
      console.log("Response from background script", result)
      res.send({ message: result })
    }
  } catch (error) {
    console.log("Error sending job information to background script", error)
  }
  res.send({
    message: "Error, something unexpected happened. Please try again."
  })
}

export default handler
