import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

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

const PictureDatePicker = (): JSX.Element => {
  const [startDate, setStartDate] = React.useState(new Date());
  const ExampleCustomInput = React.forwardRef(({value, onClick}: any, ref: any) => (
    <ButtonInput onClick={onClick} ref={ref}>
      {value}
    </ButtonInput>
  ));
  return (
    <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} customInput={<ExampleCustomInput />} />
  );
};

export default PictureDatePicker;

// const ButtonInput = styled.button`
//   font-size: 1em;
//   margin: 1em 5px;
//   padding: 1em;
//   background-color: #216ba5;
//   color: whitesmoke;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     color: #216ba5;
//     background-color: lightgray;
//     border: 2px solid #216ba5;
//   }
// `;

// const calendarContainer = ({className, children}: {className: string; children: string[]}) => {
//   return (
//     <div style={{padding: "16px", background: "#216ba5", color: "#fff"}}>
//       <CalendarContainer className={className}>
//         <div style={{background: "#f0f0f0"}}>Select a Date:</div>
//         <div style={{position: "relative"}}>{children}</div>
//       </CalendarContainer>
//     </div>
//   );
// };

// const CustomInput = React.forwardRef(
//   (
//     {value, onClick}: {value?: string; onClick?: React.MouseEventHandler<HTMLButtonElement>},
//     ref: React.Ref<HTMLButtonElement>
//   ) => {
//     return (
//       <ButtonInput style={{minWidth: "180px"}} onClick={onClick} ref={ref}>
//         {value}
//       </ButtonInput>
//     );
//   }
// );

// const PictureDatePicker = (props: {
//   randomDate: React.MouseEventHandler<HTMLButtonElement>;
//   date: Date;
//   changeDate: (date: Date) => void;
// }): JSX.Element => {
//   // console.log("props:", props);
//   return (
//     <React.Fragment>
//       <DatePicker
//         selected={new Date(props.date)}
//         onChange={props.changeDate}
//         dateFormat="yyyy-MM-dd"
//         minDate={new Date("1995-06-16")}
//         maxDate={new Date()}
//         calendarContainer={calendarContainer}
//         customInput={<CustomInput />}
//         showWeekNumbers={true}
//         showYearDropdown={true}
//         showMonthDropdown={true}
//         scrollableYearDropdown={true}
//         withPortal={true}
//         yearDropdownItemNumber={12}
//         dropdownMode="select"
//         todayButton="Today"
//       />
//     </React.Fragment>
//   );
// };

// export default PictureDatePicker;
