import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PictureDatePicker = (): JSX.Element => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [isOpen, setIsOpen] = React.useState(false);
  const handleChange = (e: any) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="example-custom-input" onClick={handleClick}>
        {/* {format(startDate, "dd-MM-yyyy")} */}
      </button>
      {isOpen && <DatePicker selected={startDate} onChange={handleChange} inline />}
    </>
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
