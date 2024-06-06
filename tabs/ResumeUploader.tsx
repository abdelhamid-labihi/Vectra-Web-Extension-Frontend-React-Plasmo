import { useRef, useState } from "react"

import "../style.css"

import Header from "~components/Header"

const ResumeUploader = () => {
  const [dragging, setDragging] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState(undefined)
  const [fileUrl, setFileUrl] = useState(undefined)
  const fileInputRef = useRef(null)

  const handleCancel = () => {
    setSelectedFile(undefined)
    setFileUrl(undefined)
    setError(null)
    setSuccess(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0])
    setFileUrl(URL.createObjectURL(event.target.files[0]))
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setSelectedFile(event.dataTransfer.files[0])
    setFileUrl(URL.createObjectURL(event.dataTransfer.files[0]))
    setDragging(false)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleSuccess = () => {
    chrome.tabs.update({
      url: chrome.runtime.getURL("tabs/MakeCv.html")
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      setError("No file selected")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("resume_file", selectedFile)

    try {
      const response = await fetch(
        "https://vectra-backend-ai.issaminu.com/resume_to_json",
        {
          method: "POST",
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("data", data.inference.prediction)
      setSuccess(true)
      chrome.storage.local.set({ resume: data.inference.prediction })
    } catch (err) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-row items-center justify-center mt-36">
        {selectedFile ? (
          <div className="px-10 py-5 bg-white shadow-lg border-md ring-1 ring-inset ring-gray-300">
            {error ? (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert">
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Server error! </span>Please try
                  again later.
                </div>
              </div>
            ) : (
              <h2 className="py-2.5 px-20 me-2 mb-2 text-sm font-semibold w-full text-gray-900 border-dashed focus:outline-none bg-white rounded-md text-center border border-gray-200  focus:z-10 focus:ring-4   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Resume Preview
              </h2>
            )}
            <embed
              src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              width="500"
              height="375"
              type="application/pdf"
              className="rounded-md bg-slate-400"
            />
            <div className="flex flex-row gap-2 mt-5 ">
              <button
                type="button"
                className="rounded-md px-2.5 py-1.5 bg-indigo-500 text-white text-sm font-semibold ring-inset hover:bg-black-800  w-1/2"
                style={
                  isloading
                    ? {
                        cursor: "not-allowed"
                      }
                    : {}
                }
                disabled={isloading}
                onClick={success ? handleSuccess : handleSubmit}>
                {isloading ? (
                  <svg
                    aria-hidden="true"
                    className="inline w-3 h-5 text-white animate-spin dark:text-white fill-gray-600 dark:fill-gray-300"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : success ? (
                  "Continue"
                ) : (
                  "Sumbit"
                )}
              </button>
              <button
                type="button"
                className="w-1/2 text-sm font-semibold leading-6 text-indigo-300 ring-inset"
                onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="w-[850px] rounded-md bg-white px-10 py-5 border-md shadow-lg ring-1 ring-inset ring-gray-300 cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current.click()}>
            <div className="col-span-full ">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-center text-gray-900">
                Upload your CV{" "}
              </label>
              <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACT0lEQVR4nO3Yv4sTQRQH8I0/8AeoWCgqVjaKf4FgI2hjK17r4SFLMi/L5b31PH+A3xc5OS0srhREEKys/AMEKzsR9AR7RTuxUvG3jJnETc7j8NiZ3QvzYEjC7MzuJ+/N7iRJskyQ6C9fzbC+Sjtze5MQQR4hQTHkTuhr3mAY8g1hXey/NnPsLvs8wSBZdn2XEbzwnhnyDLHvg2AoACQIhgJBvGMoIMQrhgJDvGGoAogXTFWQ0jFVQkrFVA0pDRNir/XfjXVxPCCyiuvxBVltUIRIzIiXoFhaEkvLS1AsLVm5tIx0j5NoRqyXWowz2QXs7/c1p68dJME520esZ7Mch4tj253uUWKdHWoz2FdJRgzj2dDfO4JPFufGX3F7pG+9fvw0jLnB/Iyro0/tJuNIZRDD+mNi4sH6dgcnSPDdbu6KkFaOU+Y89hDrc/u5nXdPjkCo1cEB27JsYVOlkMEY1if2m88ybC9C/vTlOOYy87AIMTlOl3U9JULwlARf0/T2xlGIzRqxfibBuzpDGvaCbTaI8ciNH4L0jtc3tvzs8YPSYtzvL3YAGyqDuOM+uoX9ti04tByEGK8tHMC6fy32SWBzhRCbBZ03gqmpmZvbCuNHIQ3D+sWIvneoHqSjk62L8zttS5KkUYs1MjJ+CGIz5bL2uM5rZEksuWuJLrg5p9ckxAjukOg9d+t9mabYuqYgRnD57xNfPxjBXfuvyGD+OkFWCuZbW9LZGzuSEoLi7lfiDysvQbG0JJaWl6BYWhJLy0tQLC0Zs9KimrVk3CG/AZtA7Fw2gIDFAAAAAElFTkSuQmCC"
                    title="CV"
                  />
                  <div className="flex mt-4 text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative font-semibold text-indigo-500 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-indigo-600 focus-within:ring-offset-2">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    We accept for now just PDF (Max 10 Mb)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center w-full mt-3">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-sm font-medium text-center bg-white">
                OR
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <div className="flex justify-center mt-5 aling-center">
              <button
                type="button"
                onClick={() =>
                  chrome.tabs.create({
                    url: chrome.runtime.getURL("tabs/MakeCv.html")
                  })
                }
                className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm  font-semibold text-white hover:shadow-md  ring-inset hover:bg-black-800  w-1/3">
                Fill your information manually
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ResumeUploader
