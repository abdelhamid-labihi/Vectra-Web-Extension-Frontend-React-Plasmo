import { useEffect, useRef, useState } from "react"
import "../style.css"
import Header from "~componenents/Header"
import { title } from "process";


const ResumeUploader = () => {
  const [dragging, setDragging] = useState(false); 
  const [isloading , setIsLoading] = useState(false) ;
  const [error,setError] = useState(null);
  const [cvData,setCvData] = useState(null);
  const isMounted = useRef(true)
  const [selectedFile, setSelectedFile] = useState(undefined)
  const [fileUrl , setFileUrl] = useState(undefined)
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CV",title);
    formData.append("pdf",selectedFile);
    console.log(selectedFile);
    try {
      const response = await fetch('http://localhost:3001/upload', { // '/upload' should be the URL of your server endpoint
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error)
    }
    
    /*if (!selectedFile) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`http://localhost:3001/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCvData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
    */
  };
   
  
  return (
    <>
    <Header />
    <div
      className="flex flex-row items-center justify-center mt-44"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}>
      {selectedFile ? (
        <div className="bg-white px-10 py-5 border-md shadow-lg ring-1 ring-inset ring-gray-300">
          <h2 className="py-2.5 px-20 me-2 mb-2 text-sm font-semibold w-full text-gray-900 border-dashed focus:outline-none bg-white rounded-md text-center border border-gray-200  focus:z-10 focus:ring-4   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            File Preview
          </h2>
          <embed
            src={fileUrl}
            width="500"
            height="375"
            type="application/pdf"
            className="rounded-md bg-slate-400"
          />
          <div className=" flex flex-row  gap-2 mt-5 ">
            <button
              type="button"
              className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm  font-semibold text-white hover:shadow-md  ring-inset hover:bg-black-800  w-1/2"
              onClick={handleSubmit}
              >
              Sumbit
            </button>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-indigo-300 w-1/2 ring-inset  hover:shadow-sm"
              onClick={() => setSelectedFile(undefined)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[850px] rounded-md bg-white px-10 py-5 border-md shadow-lg ring-1 ring-inset ring-gray-300 ">
          <div className="col-span-full ">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900 text-center">
              Upload your CV{" "}
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACT0lEQVR4nO3Yv4sTQRQH8I0/8AeoWCgqVjaKf4FgI2hjK17r4SFLMi/L5b31PH+A3xc5OS0srhREEKys/AMEKzsR9AR7RTuxUvG3jJnETc7j8NiZ3QvzYEjC7MzuJ+/N7iRJskyQ6C9fzbC+Sjtze5MQQR4hQTHkTuhr3mAY8g1hXey/NnPsLvs8wSBZdn2XEbzwnhnyDLHvg2AoACQIhgJBvGMoIMQrhgJDvGGoAogXTFWQ0jFVQkrFVA0pDRNir/XfjXVxPCCyiuvxBVltUIRIzIiXoFhaEkvLS1AsLVm5tIx0j5NoRqyXWowz2QXs7/c1p68dJME520esZ7Mch4tj253uUWKdHWoz2FdJRgzj2dDfO4JPFufGX3F7pG+9fvw0jLnB/Iyro0/tJuNIZRDD+mNi4sH6dgcnSPDdbu6KkFaOU+Y89hDrc/u5nXdPjkCo1cEB27JsYVOlkMEY1if2m88ybC9C/vTlOOYy87AIMTlOl3U9JULwlARf0/T2xlGIzRqxfibBuzpDGvaCbTaI8ciNH4L0jtc3tvzs8YPSYtzvL3YAGyqDuOM+uoX9ti04tByEGK8tHMC6fy32SWBzhRCbBZ03gqmpmZvbCuNHIQ3D+sWIvneoHqSjk62L8zttS5KkUYs1MjJ+CGIz5bL2uM5rZEksuWuJLrg5p9ckxAjukOg9d+t9mabYuqYgRnD57xNfPxjBXfuvyGD+OkFWCuZbW9LZGzuSEoLi7lfiDysvQbG0JJaWl6BYWhJLy0tQLC0Zs9KimrVk3CG/AZtA7Fw2gIDFAAAAAElFTkSuQmCC"title="CV" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none  focus-within:ring-indigo-600 focus-within:ring-offset-2 text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="application/pdf"
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
            <span className="px-2 bg-white text-center font-medium text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex justify-center aling-center  mt-5">
          <button
              type="button"
              onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('tabs/MakeCv.html') })}
              className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm  font-semibold text-white hover:shadow-md  ring-inset hover:bg-black-800  w-1/3">
              Make One 
            </button>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
}




export default ResumeUploader;

