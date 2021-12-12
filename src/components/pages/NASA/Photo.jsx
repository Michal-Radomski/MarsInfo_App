import React from "react";

const Photo = (props) => {
  if (!props.photo.title) {
    return <div>No photo for selected day</div>;
  }
  return (
    <React.Fragment>
      <h3>{props.photo.title}</h3>
      <img src={props.photo.url} alt={props.photo.title} />
      <p>{props.photo.explanation}</p>
    </React.Fragment>
  );
};

export default Photo;
