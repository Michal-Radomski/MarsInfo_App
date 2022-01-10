import React from "react";
import {useTable} from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  padding: 0.25rem;

  table {
    border-spacing: 0;
    border: 1px solid darkGray;
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
      padding: 0.25rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const WeatherInSightTable = (props: State): JSX.Element => {
  console.log("props:", props);
  const temp = props.weatherLastRecord.InSight_Weather_Data.AT;
  const pressure = props.weatherLastRecord.InSight_Weather_Data.PRE;
  const wind = props.weatherLastRecord.InSight_Weather_Data.WD.most_common;

  const data = React.useMemo(
    () => [
      {
        col1: "Sol number" as string,
        col2: (parseInt(props.weatherLastRecord.InSight_sol) || "No Data") as number,
      },
      {
        col1: "Average Temp" as string,
        col2: (`${temp.av.toFixed(2)} °C` || "No Data") as string,
      },
      {
        col1: "Min Temp" as string,
        col2: (`${temp.mn.toFixed(2)} °C` || "No Data") as string,
      },
      {
        col1: "Max Temp" as string,
        col2: (`${temp.mx.toFixed(2)} °C` || "No Data") as string,
      },
      {
        col1: "Average Pressure" as string,
        col2: (`${pressure.av.toFixed(2)} Pa` || "No Data") as string,
      },
      {
        col1: "Average Horizontal Wind Speed" as string,
        col2: (`${props.weatherLastRecord.InSight_Weather_Data.HWS.av.toFixed(2)} m/s` || "No Data") as string,
      },
      {
        col1: "Wind Direction/ Compass Point" as string,
        col2: (`${wind.compass_degrees} deg/ ${wind.compass_point}` || "No Data") as string,
      },
    ],
    [
      pressure.av,
      props.weatherLastRecord.InSight_Weather_Data.HWS.av,
      props.weatherLastRecord.InSight_sol,
      temp.av,
      temp.mn,
      temp.mx,
      wind.compass_degrees,
      wind.compass_point,
    ]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: `Latest Weather Conditions at ${props.location ?? "No Data"}:`,
        columns: [
          {
            Header: "Terrestrial Date:" as string,
            accessor: "col1" as string, //* accessor is the "key" in the data
          },
          {
            Header: (new Date(props.weatherLastRecord.InSight_Weather_Data.First_UTC).toDateString() || "No Data") as string,
            accessor: "col2" as string,
            Cell: ({value}: any) => <b>{value}</b>,
          },
        ],
      },
    ],
    [props.location, props.weatherLastRecord.InSight_Weather_Data.First_UTC]
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data});

  return (
    <Styles>
      <table {...getTableProps()} style={{border: "solid 1px blue", width: "auto"}}>
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
                        padding: "0.25rem",
                        border: "solid 1px Darkgray",
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
