import { Column } from "../App";
import { Pagination, Table } from "react-bootstrap";
import { FC } from "react";
import "./table.css";
import { useState } from "react";

type Data = {
  [key: string]: string | number;
};

type Props = {
  columns: Column[];
  data: Data[];
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalCount: number;
  PAGE_SIZE: number;
};
const TableFC: FC<Props> = ({
  columns,
  data,
  setCurrentPage,
  currentPage,
  totalCount,
  PAGE_SIZE,
}) => {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((row) =>
    Object.keys(row).some(
      (key) =>
        key === selectedColumn &&
        row[key] &&
        row[key].toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const pages = [];
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (startPage > 1) {
    pages.unshift(<Pagination.Ellipsis key="startEllipsis" />);
  }

  if (endPage < totalPages) {
    pages.push(<Pagination.Ellipsis key="endEllipsis" />);
  }

  return (
    <div className="tableSection">
      <Table className="table" responsive striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.fieldName}>
                {column.name}

                <div>
                  <input
                    type="text"
                    placeholder="Search"
                    value={
                      selectedColumn === column.fieldName ? searchText : ""
                    }
                    onChange={(e) => {
                      setSelectedColumn(column.fieldName);
                      setSearchText(e.target.value);
                    }}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column.fieldName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pages}
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};
export default TableFC;
