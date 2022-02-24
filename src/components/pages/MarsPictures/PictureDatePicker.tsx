import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import "../../../styles/App.scss";

const ButtonInput = styled.button`
  font-size: 1em;
  margin: 0;
  padding: 5px 15px;
  background-color: #216ba5;
  color: whitesmoke;
  border-radius: 5px;
  cursor: progress !important;
  border: 2px solid #333;
  width: 125px;
  &:hover {
    color: #216ba5;
    background-color: lightgray;
    border: 2px solid #216ba5;
  }
`;

const PictureDatePicker = ({
  selectedDate,
  minDate,
  changeDate,
  today,
}: {
  selectedDate: string;
  minDate: string;
  changeDate: (date: Date) => Promise<void>;
  today: string;
}): JSX.Element => {
  const startDate = new Date(selectedDate);

  const CustomInput = React.forwardRef(
    (
      {value, onClick}: {value?: string; onClick?: React.MouseEventHandler<HTMLButtonElement>},
      ref: React.Ref<HTMLButtonElement>
    ) => (
      <ButtonInput onClick={onClick} ref={ref}>
        {value}
        {/* {console.log("value:", value)} */}
      </ButtonInput>
    )
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date) => changeDate(date)}
      customInput={<CustomInput />}
      dateFormat="yyyy-MM-dd"
      minDate={new Date(minDate)}
      maxDate={new Date()}
      showWeekNumbers={true}
      showYearDropdown={true}
      showMonthDropdown={true}
      scrollableYearDropdown={true}
      withPortal={false}
      yearDropdownItemNumber={20}
      dropdownMode="select"
      showPopperArrow={false}
      popperPlacement="top-start"
      popperClassName="popperStyle"
      todayButton={today}
    />
  );
};

export default PictureDatePicker;
