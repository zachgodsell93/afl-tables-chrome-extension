import React from "react";
import "./Popup.css";
import { HandleTables } from "./components/HandleTables";

const Popup = () => {
  const [html, setHtml] = React.useState<any>(null);
  const [isPopoutOpened, setIsPopoutOpened] = React.useState<boolean>(false);
  const [tableFound, setTableFound] = React.useState<boolean>(false);

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
            let res: string = html[0].result as string;
            setHtml(res);
            console.log(typeof html[0].result);
            let table = res.search("table");
            setTableFound(table === -1 ? false : true);
          });
      }
    });
  }, []);

  return (
    <div className=" w-[400px] bg-slate-400 min-h-[400px]">
      <header className="flex flex-wrap">
        <div className="w-full flex h-12 bg-slate-700">
          <h3 className="my-auto font-bold text-2xl text-white">
            AFL Tables CSV Scraper
          </h3>
        </div>
      </header>
      <div className="w-full font-bold text-xl text-left">
        <p>{tableFound ? "Tables Gathered" : "No Tables Found"} </p>
      </div>
      <div className="w-full">
        {tableFound ? <HandleTables htmlData={html} /> : null}
      </div>
    </div>
  );
};

export default Popup;
