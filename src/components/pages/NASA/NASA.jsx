import React from "react";
import DateInput from "./DateInput";
import Photo from "./Photo";

const API_KEY = process.env.REACT_APP_NASA_API_KEY;
// console.log("API_KEY:", API_KEY);

class NASA extends React.Component {
  state = {
    date: new Date().toISOString().split("T")[0],
    photo: "",
  };

  getPhoto = (date) => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => this.setState({photo: data}));
  };

  componentDidMount() {
    this.getPhoto(this.state.date);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  changeDate = async (event) => {
    event.preventDefault();
    let dateFromInput = event.target[0].value;
    // console.log("dateFromInput:", dateFromInput);
    await this.setState({date: dateFromInput});
    await this.getPhoto(this.state.date);
  };

  render() {
    return (
      <div>
        <h1>NASA's Astronomy Picture of the Day</h1>
        <DateInput changeDate={this.changeDate} />
        <Photo photo={this.state.photo} />
      </div>
    );
  }
}

export default NASA;
