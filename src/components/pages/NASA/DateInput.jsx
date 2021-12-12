import React from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = (props) => {
  // console.log("props:", props);
  return (
    <React.Fragment>
      <form onSubmit={props.changeDate}>
        Enter a date (YYYY-MM-DD):
        <input />
        <input type="submit" />
      </form>
      Select a Date:
      {/* <DatePicker selected={props.date} onChange={props.changeDate} /> */}
    </React.Fragment>
  );
};

export default DateInput;
