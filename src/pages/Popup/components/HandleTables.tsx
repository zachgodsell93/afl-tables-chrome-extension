import React from "react";

interface HandleTablesProps {
  htmlData: string;
}

export const HandleTables: React.FC<HandleTablesProps> = (props) => {
  const { htmlData } = props;

  const [tables, setTables] = React.useState([]);

  React.useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, "text/html");
    const tableElements = doc.querySelectorAll<HTMLTableElement>("table");
  }, []);

  return <div></div>;
};
