import React from "react";
import DatePicker, {CalendarContainer} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Button = styled.button`
  font-size: 1em;
  margin: 1em 5px;
  padding: 1em;
  background-color: #202020;
  color: whitesmoke;
  border-radius: 5px;
  min-width: 180px;
  cursor: pointer;
  &:hover {
    color: #202020;
    background-color: lightgray;
    border: 2px solid #202020;
  }
`;

const ButtonInput = styled.button`
  font-size: 1em;
  margin: 1em 5px;
  padding: 1em;
  background-color: #216ba5;
  color: whitesmoke;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: #216ba5;
    background-color: lightgray;
    border: 2px solid #216ba5;
  }
`;

const Div = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  align-content: flex-start;
  margin-left: auto;
  margin-right: auto;
`;
const Line = styled.p`
  margin: 5px;
  min-width: 265px;
`;

const calendarContainer = ({className, children}: {className: string; children: string[]}) => {
  return (
    <div style={{padding: "16px", background: "#216ba5", color: "#fff"}}>
      <CalendarContainer className={className}>
        <div style={{background: "#f0f0f0"}}>Select a Date:</div>
        <div style={{position: "relative"}}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

const CustomInput = React.forwardRef(
  (
    {value, onClick}: {value?: string; onClick?: React.MouseEventHandler<HTMLButtonElement>},
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <ButtonInput style={{minWidth: "180px"}} onClick={onClick} ref={ref}>
        {value}
      </ButtonInput>
    );
  }
);

const DateInput = (props: {
  randomDate: React.MouseEventHandler<HTMLButtonElement>;
  date: Date;
  changeDate: (date: Date) => void;
}): JSX.Element => {
  // console.log("props:", props);
  return (
    <React.Fragment>
      {/* <form onSubmit={props.changeDate}>
        Enter a date:
        <input type="date" min="1995-06-16" max={new Date().toISOString().split("T")[0]} />
        <input type="submit" value="Submit" />
      </form> */}
      <Div>
        <Button onClick={props.randomDate}>Random photo</Button>
        <Line>or select a date (UTC-05:00):</Line>
        <DatePicker
          selected={new Date(props.date)}
          onChange={props.changeDate}
          dateFormat="yyyy-MM-dd"
          minDate={new Date("1995-06-16")}
          maxDate={new Date()}
          calendarContainer={calendarContainer}
          customInput={<CustomInput />}
          showWeekNumbers
        />
      </Div>
    </React.Fragment>
  );
};

export default DateInput;
