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
  const temp = props.weatherLastRecord.AT;
  const pressure = props.weatherLastRecord.PRE;
  const wind = props.weatherLastRecord.WD.most_common;

  const data = React.useMemo(
    () => [
      {
        col1: "Sol number" as string,
        // col2: `${temp.av.toFixed(2)} °C` as string,
      },
      {
        col1: "Average Temp" as string,
        col2: `${temp.av.toFixed(2)} °C` as string,
      },
      {
        col1: "Min Temp" as string,
        col2: `${temp.mn.toFixed(2)} °C` as string,
      },
      {
        col1: "Max Temp" as string,
        col2: `${temp.mx.toFixed(2)} °C` as string,
      },
      {
        col1: "Average Pressure" as string,
        col2: `${pressure.av.toFixed(2)} Pa` as string,
      },
      {
        col1: "Average Horizontal Wind Speed" as string,
        col2: `${props.weatherLastRecord.HWS.av.toFixed(2)} m/s` as string,
      },
      {
        col1: "Wind Direction/ Compass Point" as string,
        col2: `${wind.compass_degrees} deg/ ${wind.compass_point}` as string,
      },
    ],
    [pressure.av, props.weatherLastRecord.HWS.av, temp.av, temp.mn, temp.mx, wind.compass_degrees, wind.compass_point]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Header",
        columns: [
          {
            Header: "Column1" as string,
            accessor: "col1" as string, // accessor is the "key" in the data
          },
          {
            Header: "Column2" as string,
            accessor: "col2" as string,
          },
        ],
      },
    ],
    []
  );
  //* const columns = React.useMemo(
  //*   () => [
  //*     {
  //*       Header: "Name" as string,
  //*       columns: [
  //*         {
  //*           Header: "Column1" as string,
  //*           accessor: "col1" as string, // accessor is the "key" in the data
  //*         },
  //*         {
  //*           Header: "Column2" as string,
  //*           accessor: "col2" as string,
  //*         },
  //*       ],
  //*     },
  //*   ],
  //*   []
  //* );

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
