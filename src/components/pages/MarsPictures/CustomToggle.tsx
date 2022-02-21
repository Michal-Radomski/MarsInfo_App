import React from "react";
import {AccordionContext} from "react-bootstrap";
import {useAccordionButton} from "react-bootstrap/AccordionButton";
import {useDispatch} from "react-redux";

import {SET_ACTIVE_TAB} from "../../../redux/actions";

const styles = {
  Active: {
    color: "#0D6EFD",
    backgroundColor: "#CFE2FF",
    border: "2px solid #86b7fe",
    padding: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    boxShadow: "0 0 0 0.25rem rgba(13,110,253,0.25)",
  },
  InActive: {
    color: "black",
    backgroundColor: "lightgrey",
    border: "none",
    padding: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    boxShadow: "none",
  },
};

type CustomToggle_Props = {
  children?: React.ReactNode;
  eventKey: string;
  callback?: (str: string) => string;
};

function CustomToggle({children, eventKey, callback}: CustomToggle_Props): JSX.Element {
  const {activeEventKey} = React.useContext(AccordionContext);

  const customAccordionOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));
  const isCurrentEventKey = activeEventKey === eventKey;

  const dispatch: Dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({type: SET_ACTIVE_TAB, payload: activeEventKey});
    // console.log("activeEventKey:", activeEventKey);
  });

  return (
    <div onClick={customAccordionOnClick} style={isCurrentEventKey ? styles.Active : styles.InActive}>
      {children}
    </div>
  );
}

export default CustomToggle;
