import React from "react";
import momentRandom from "moment-random";
import styled from "styled-components";

import DateInput from "./DateInput";
import Photo from "./Photo";

const API_KEY = process.env.REACT_APP_NASA_API_KEY as string;
// console.log("API_KEY:", API_KEY);

const Div = styled.div`
  margin: 5px;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
`;

const H1 = styled.h1`
  text-align: center;
  color: palevioletred;
  margin: 5px;
`;

type State = {
  date: Date;
  photo: {
    title: string;
    url: string;
    explanation: string;
  };
};

class NASA extends React.Component<{}, State> {
  state: State = {
    date: new Date(),
    photo: {
      title: "",
      url: "",
      explanation: "",
    },
  };

  getPhoto = (date: string) => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => this.setState({photo: data}));
  };

  componentDidMount() {
    // console.log("this.state:", this.state);
    this.getPhoto("");
  }

  // componentDidUpdate() {
  //   console.log("this.state:", this.state);
  //   console.log("this.state.date:", this.state?.date.toISOString().split("T")[0]);
  // }

  // changeDate = async (event) => {
  //   event.preventDefault();
  //   let dateFromInput = event.target[0].value;
  //   // console.log("dateFromInput:", dateFromInput);
  //   await this.setState({date: dateFromInput});
  //   await this.getPhoto(this.state.date);
  // };

  changeDate = async (dateFromInput: Date) => {
    await this.setState({date: dateFromInput});
    await this.getPhoto(this.state.date.toISOString().split("T")[0]);
  };

  randomDate = async () => {
    let minDate = new Date("1995-06-16");
    let maxDate = new Date();
    let randomDate = momentRandom(maxDate, minDate)._d;
    // console.log("randomDate:", randomDate);
    await this.setState({date: randomDate});
    await this.getPhoto(this.state.date.toISOString().split("T")[0]);
  };

  render() {
    return (
      <Div>
        <H1>NASA's Astronomy Picture of the Day</H1>
        <DateInput changeDate={this.changeDate} date={this.state.date} randomDate={this.randomDate} />
        <Photo photo={this.state.photo} />
      </Div>
    );
  }
}

export default NASA;
