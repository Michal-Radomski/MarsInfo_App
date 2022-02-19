import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const ButtonInput = styled.button`
  font-size: 1em;
  margin: 0;
  padding: 5px 15px;
  background-color: #216ba5;
  color: whitesmoke;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid #333;
  width: 125px;
  &:hover {
    color: #216ba5;
    background-color: lightgray;
    border: 2px solid #216ba5;
  }
`;

const PictureDatePicker = (): JSX.Element => {
  const [startDate, setStartDate] = React.useState(new Date());
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
      onChange={(date: Date) => setStartDate(date)}
      customInput={<CustomInput />}
      dateFormat="yyyy-MM-dd"
      minDate={new Date("1995-06-16")}
      maxDate={new Date()}
      showWeekNumbers={true}
      showYearDropdown={true}
      showMonthDropdown={true}
      scrollableYearDropdown={true}
      withPortal={false}
      yearDropdownItemNumber={12}
      dropdownMode="select"
      showPopperArrow={false}
      popperPlacement="top-start"
    />
  );
};

export default PictureDatePicker;
