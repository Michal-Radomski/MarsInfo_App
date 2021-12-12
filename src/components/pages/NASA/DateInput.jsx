import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
  // console.log("props:", props);
  return (
    <React.Fragment>
      {/* <form onSubmit={props.changeDate}>
        Enter a date:
        <input type="date" min="1995-06-16" max={new Date().toISOString().split("T")[0]} />
        <input type="submit" value="Submit" />
      </form> */}
      Select a Date:
      <DatePicker
        selected={new Date(props.date)}
        onChange={props.changeDate}
        dateFormat="yyyy-MM-dd"
        minDate={new Date("1995-06-16")}
        maxDate={new Date()}
      />
    </React.Fragment>
  );
};

export default DateInput;
