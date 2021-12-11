import React from "react";

const DateInput = (props) => {
  return (
    <React.Fragment>
      <form onSubmit={props.changeDate}>
        Enter a date (YYYY-MM-DD):
        <input />
        <input type="submit" />
      </form>
    </React.Fragment>
  );
};

export default DateInput;
