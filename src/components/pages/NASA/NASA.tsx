import React from "react";
import momentRandom from "moment-random";
import styled from "styled-components";
import {connect} from "react-redux";

import DateInput from "./DateInput";
import Photo from "./Photo";
import {setAPOD_Date} from "../../../redux/actions";
import Spinner from "../../../Spinner";

const API_KEY = process.env.REACT_APP_NASA_API_KEY as string;
// console.log("API_KEY:", API_KEY);

const Div = styled.div`
  margin: 5px;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  margin-left: auto;
  margin-right: auto;
`;

const H1 = styled.h1`
  text-align: center;
  color: palevioletred;
  margin: 5px;
`;

type LocalState = {
  date: Date;
  photo: {
    title: string;
    url: string;
    explanation: string;
  };
  loaded: boolean;
};

class NASA extends React.Component<{state: {NASA_APOD: {selectedDate: string}}; setAPOD_Date: Dispatch}, State> {
  state: LocalState = {
    date: this.props.state.NASA_APOD.selectedDate === "" ? new Date() : new Date(this.props.state.NASA_APOD.selectedDate),
    photo: {
      title: "",
      url: "",
      explanation: "",
    },
    loaded: false,
  };

  getPhoto = (date: string) => {
    // console.log("date", date)
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setTimeout(() => this.setState({photo: data, loaded: true}), 1200));
  };

  componentDidMount() {
    // console.log("this.state:", this.state);
    const savedDate = JSON.parse(localStorage.getItem("chosenDate") as string);
    // console.log("savedDateMount0:", savedDate);
    savedDate !== null ? this.getPhoto(savedDate) : this.getPhoto("");
    if (savedDate !== null) {
      // console.log("savedDateMount1:", savedDate);
      const dateFromLocalStorage = new Date(savedDate);
      // console.log("dateFromLocalStorage:", dateFromLocalStorage);
      this.setState({date: dateFromLocalStorage});
      // console.log("this.state.date-mount:", this.state?.date.toISOString().split("T")[0]);
    }
    //* Setting the Global Store
    setTimeout(() => {
      const selectedDate = this.state.date.toISOString().split("T")[0];
      // console.log("this.props.setAPOD_Date:", this.props.setAPOD_Date);
      console.log("selectedDate:", selectedDate);
      this.props.setAPOD_Date(selectedDate);
    }, 500);
  }

  componentDidUpdate() {
    // console.log("this.state:", this.state);
    // console.log("this.state.date:", this.state?.date.toISOString().split("T")[0]);
    localStorage.setItem("chosenDate", JSON.stringify(this.state.date.toISOString().split("T")[0]));
  }

  // changeDate = async (event) => {
  //   event.preventDefault();
  //   let dateFromInput = event.target[0].value;
  //   console.log("dateFromInput:", dateFromInput);
  //   await this.setState({date: dateFromInput});
  //   await this.getPhoto(this.state.date);
  // };

  changeDate = async (dateFromInput: Date) => {
    await this.setState({date: dateFromInput});
    await this.getPhoto(this.state.date.toISOString().split("T")[0]);
    await this.props.setAPOD_Date(this.state.date.toISOString().split("T")[0]);
  };

  randomDate = async () => {
    let minDate = new Date("1995-06-16");
    let maxDate = new Date();
    let randomDate = momentRandom(maxDate, minDate)._d;
    // console.log("randomDate:", randomDate);
    await this.setState({date: randomDate});
    await this.getPhoto(this.state.date.toISOString().split("T")[0]);
    await this.props.setAPOD_Date(this.state.date.toISOString().split("T")[0]);
  };

  render() {
    if (!this.state.loaded) {
      return <Spinner />;
    }

    return (
      <Div>
        <H1>NASA's Astronomy Picture of the Day</H1>
        <DateInput changeDate={this.changeDate} date={this.state.date} randomDate={this.randomDate} />
        <Photo photo={this.state.photo} />
      </Div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  state: state.rootReducer,
});

export default connect(mapStateToProps, {setAPOD_Date})(NASA);
