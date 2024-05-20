import "./style.css"
import "./componenents/Another"
import React, { useEffect,useState } from "react";
import Another from './componenents/Another';

function IndexPopup() {
  const [isAuthentified, setIsAuthentified] = useState(false)
  

  useEffect(() => {
    chrome.storage.local.get('isAuthenticated', (result) => {
      if (result.isAuthenticated) {
        setIsAuthentified(true);
      } else {
        chrome.runtime.sendMessage({ action: 'authenticate' });
      }
    });
   

    const listener = (changes, area) => {
      if (area === 'local' && changes.isAuthentified) {
        setIsAuthentified(changes.isAuthentified.newValue);
      }
    };
    
    chrome.storage.onChanged.addListener(listener);
    
    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);
  return isAuthentified ? <Another /> : <h1>Not hellow</h1>
}

export default IndexPopup
