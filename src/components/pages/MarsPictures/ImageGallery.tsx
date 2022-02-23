import React from "react";
import styled from "styled-components";

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

const GalleryDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  gap: 20px;
`;

const ImageDiv = styled.div`
  background-color: lightyellow;
  align-self: flex-start;
`;

const Span = styled.span`
  font-weight: bold;
  font-style: italic;
`;

const ImageGallery = ({pictures, name, date}: {pictures: {photos: Image[]} | string; name: string; date: string}) => {
  // console.log("name, pictures:", name, pictures);
  const photosFromMarsRover =
    typeof pictures === "string" ? (
      <h3 style={{textAlign: "center", color: "#dd2e44"}}>
        {pictures}: <Span>{date}</Span>
      </h3>
    ) : (
      <div style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "95%"}}>
        <h5 style={{textAlign: "center", color: "maroon"}}>
          Rover Name: <Span>{name}</Span>, Rover Id: <Span>{pictures?.photos[0].rover.id}</Span>, selected date:{" "}
          <Span>{date}</Span>
        </h5>
        <GalleryDiv>
          {pictures?.photos.map((picture: Image) => {
            return (
              <ImageDiv key={picture.id}>
                <img width="200px" src={picture.img_src} alt={"picture ID:" + picture.id}></img>
                <p>Name of Camera: {picture.camera.name}</p>
                <p>Full Camera Name: {picture.camera.full_name}</p>
                <p>Earth date: {picture.earth_date}</p>
                <p>Sol: {picture.sol}</p>
              </ImageDiv>
            );
          })}
        </GalleryDiv>
      </div>
    );
  // console.log("photosFromMarsRover:", photosFromMarsRover);

  return <React.Fragment>{photosFromMarsRover}</React.Fragment>;
};

export default ImageGallery;
