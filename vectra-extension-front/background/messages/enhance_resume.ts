import type { PlasmoMessaging } from "@plasmohq/messaging"

export type EnhanceResumeRequestBody = {
  hard_skills: string[]
  soft_skills: string[]
  job_title: string
  company: string
  enhance: boolean
  username: string
}

export type EnhanceResumeResponseBody = {
  message: string
}

const handler: PlasmoMessaging.MessageHandler<
  EnhanceResumeRequestBody,
  EnhanceResumeResponseBody
> = async (req, res) => {
  try {
    console.log("Sending job information to background script")
    const { job_title, company, hard_skills, soft_skills, enhance, username } =
      req.body

    const response = await fetch(
      `https://vectra-backend-spring.issaminu.com/resume/enhance?username=${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          job_title,
          company,
          hard_skills,
          soft_skills,
          enhance
        })
      }
    )
    if (response.ok) {
      const result = await response.text()
      console.log("Response from background script", result)
      res.send({ message: result })
    } else {
      throw new Error("Request failed")
    }
  } catch (error) {
    console.log("Error sending job information to background script", error)
    res.send({
      message: `Error caught! ${error}`
    })
  }
}

export default handler
