import React from "react";
import {useTable} from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  padding: 0.25rem;
  table {
    border-spacing: 0;
    thead {
      font-style: italic;
      tr:first-child {
        text-align: center;
        font-size: 105%;
      }
    }
    ,
    th,
    td {
      margin: 0;
      padding: 0.25rem;
      border-right: 1px solid blue;
    }
    tfoot {
      text-transform: capitalize;
      font-weight: bold;
      font-style: italic;
      tr:last-child {
        text-align: right;
        font-size: 105%;
      }
    }
  }
`;

const WeatherInSightTable = (props: State): JSX.Element => {
  // console.log("props:", props);
  const temp = props.weatherLastRecord.InSight_Weather_Data.AT;
  const pressure = props.weatherLastRecord.InSight_Weather_Data.PRE;
  const wind = props.weatherLastRecord.InSight_Weather_Data.WD.most_common;
  const baseSeason = props.weatherLastRecord.InSight_Weather_Data;

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
        Header: `Latest Weather Conditions at ${props.location ?? "No Data"}:` as string,
        Footer: "Here will be a link" as string,
        columns: [
          {
            Header: "Terrestrial Date:" as string,
            accessor: "col1" as string, //* accessor is the "key" in the data
            Footer: "Northern/ Southern Season" as string,
          },
          {
            Header: (new Date(props.weatherLastRecord.InSight_Weather_Data.First_UTC).toDateString() || "No Data") as string,
            accessor: "col2" as string,
            Cell: ({value}: {value: string}) => <b>{value}</b>,
            Footer: (`${baseSeason.Northern_season}/ ${baseSeason.Southern_season}` || "No Data") as string,
          },
        ],
      },
    ],
    [
      baseSeason.Northern_season,
      baseSeason.Southern_season,
      props.location,
      props.weatherLastRecord.InSight_Weather_Data.First_UTC,
    ]
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups} = useTable({columns, data});

  return (
    <Styles>
      <table {...getTableProps()} style={{border: "solid 1px blue", minWidth: "285px", borderBottom: "solid 2px green"}}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 2px red",
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
                        border: "solid 1px darkGrey",
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

        <tfoot>
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td
                  {...column.getFooterProps()}
                  style={{
                    borderTop: "solid 2px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Footer")}{" "}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </Styles>
  );
};

export default WeatherInSightTable;
