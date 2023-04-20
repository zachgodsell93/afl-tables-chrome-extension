import React from "react";

interface HandleTablesProps {
  htmlData: string;
}

interface TableRowData {
  [index: number]: string;
}

interface TableData {
  [index: number]: TableRowData;
}
export const HandleTables: React.FC<HandleTablesProps> = (props) => {
  const { htmlData } = props;

  const [tables, setTables] = React.useState<TableData[]>([]);

  React.useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlData, "text/html");
    const tableElements = doc.querySelectorAll<HTMLTableElement>("table");

    const tableData: TableData[] = [];
    tableElements.forEach((table) => {
      const rows = table.rows;
      const tableRows: TableRowData[] = [];

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].cells;
        const rowData: string[] = [];

        for (let j = 0; j < cells.length; j++) {
          rowData.push(cells[j].textContent || "");
        }

        tableRows.push(rowData);
      }

      tableData.push(tableRows);
    });

    setTables(tableData);
  }, []);

  return (
    <div>
      {tables.map((table: any, index) => (
        <table key={index}>
          <tbody>
            {table.map((row: any, index: any) => (
              <tr key={index}>
                {row.map((cell: any, index: any) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};
