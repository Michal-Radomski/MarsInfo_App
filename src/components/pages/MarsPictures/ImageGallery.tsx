import React from "react";
// import styled from "styled-components";

interface Image {
  rover: {id: number};
  id: React.Key | number;
  earth_date: string;
  sol: number;
  img_src: string;
  camera: {
    full_name: string;
    name: string;
  };
}

const ImageGallery = ({pictures, name}: {pictures: {photos: Image[]} | string; name: string}) => {
  // console.log("name, pictures:", name, pictures);
  const photosFromMarsRover =
    typeof pictures === "string" ? (
      <h3 style={{textAlign: "center", fontWeight: "bold", color: "#dd2e44"}}>{pictures}</h3>
    ) : (
      <React.Fragment>
        <p>
          Rover Name: {name}, Rover Id: {pictures?.photos[0].rover.id}
        </p>
        {pictures?.photos.map((picture: Image) => {
          return (
            <div key={picture.id}>
              <img width="200px" src={picture.img_src} alt={"picture ID:" + picture.id}></img>
              <p>
                Name of Camera: {picture.camera.full_name} ({picture.camera.name})
              </p>
              <p>Earth date: {picture.earth_date}</p>
              <p>Sol: {picture.sol}</p>
            </div>
          );
        })}
      </React.Fragment>
    );
  // console.log("photosFromMarsRover:", photosFromMarsRover);

  return <>{photosFromMarsRover}</>;
};

export default ImageGallery;
