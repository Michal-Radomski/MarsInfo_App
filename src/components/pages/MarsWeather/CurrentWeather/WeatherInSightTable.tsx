import React from "react";
import {useTable} from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const WeatherInSightTable = (props: any): JSX.Element => {
  console.log("props:", props);
  const data = React.useMemo(
    () => [
      {
        col1: "Hello" as string,
        col2: "World" as string,
      },
      {
        col1: "react-table" as string,
        col2: "rocks" as string,
      },
      {
        col1: "whatever" as string,
        col2: "you want" as string,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1" as string,
        accessor: "col1" as string, // accessor is the "key" in the data
      },
      {
        Header: "Column 2" as string,
        accessor: "col2" as string,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    //@ts-ignore
  } = useTable({columns, data});

  return (
    <Styles>
      <table {...getTableProps()} style={{border: "solid 1px blue", width: "275px"}}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default WeatherInSightTable;
