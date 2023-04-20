import React from "react";
import "./Popup.css";

const Popup = () => {
  const [html, setHtml] = React.useState<any>(null);
  const [fetchedHtml, setFetchedHtml] = React.useState<boolean>(false);
  const [isPopoutOpened, setIsPopoutOpened] = React.useState<boolean>(false);

  const getHtml = () => {};

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (res) => {
      console.log(res);
      if (res.length > 0) {
        const url = res[0].url;
        chrome.scripting
          .executeScript({
            target: { tabId: res[0].id },
            function: () => {
              return document.body.innerHTML;
            },
          })
          .then((html) => {
            setHtml(html[0].result);
            console.log(typeof html[0].result);
            setFetchedHtml(true);
          });
      }
    });
  }, []);

  React.useEffect(() => {
    // Send a message to the background script when the component mounts
    chrome.runtime.sendMessage({ type: "POPUP_OPENED" }, (response) => {
      // Update the state variable when the response is received
      setIsPopoutOpened(response.isPopoutOpened);
    });
  }, [isPopoutOpened]);

  return (
    <div className=" w-[400px] bg-slate-300">
      <header className="flex flex-wrap">
        <div className="w-full font-bold text-xl text-center">
          <p>Afl Tables Export CSV</p>
        </div>
        <div className="w-full font-bold text-xl text-center">
          <p>Got HTML: {`${fetchedHtml}`}</p>
        </div>
        <div className="w-full font-bold text-xl text-center">
          <button onClick={getHtml}>Test</button>
        </div>
      </header>
    </div>
  );
};

export default Popup;
