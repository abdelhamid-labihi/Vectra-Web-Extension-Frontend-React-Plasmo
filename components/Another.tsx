import icon from '../assets/icon.png';


const handlechangeCv = ()=>{
     chrome.tabs.create({ url: "tabs/ResumeUploader.html" });
}

const Another = () => {
    return ( 
          <div style={{height:"110px",width:"400px"}} className='border-2 border-violet-400  flex flex-col items-center justify-center' >
             <div className="font-md flex flex-col items-center justify-center">
                 <ol className="list-decimal mt-1">
                    <li>Go to your LinkedIn Job offer link</li>
                    <li>The functionality will appear on the screen</li>
                    <li>You can, if you want, change your CV by clicking the button below 👇</li>
                 </ol>
            <button onClick={handlechangeCv}className="rounded-sm px-2.5 py-1.5 bg-indigo-500 text-white text-sm font-semibold ring-inset hover:bg-black-800 mt-2">
               Change your CV 
            </button>
           </div>
                
          </div>
     );
}
 
export default Another;