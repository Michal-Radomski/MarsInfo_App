import React from "react";
import styled from "styled-components";
import SimpleReactLightbox, {SRLWrapper, SRLWrapperOptions} from "simple-react-lightbox";
import {Tooltip, OverlayTrigger} from "react-bootstrap";

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
  gap: 15px;
`;

const ImageDiv = styled.div`
  background-color: whitesmoke;
  border: 1px solid black;
  align-self: flex-start;
  padding: 0;
  img {
    border: 10px solid white;
    width: 325px;
    height: auto;
    cursor: pointer;
  }
  div {
    padding: 5px;
    p {
      margin: 0px;
      span {
        font-weight: bold;
        font-style: italic;
      }
    }
  }
`;

const Span = styled.span`
  font-weight: bold;
  font-style: italic;
`;

const simpleLightBoxOptions: SRLWrapperOptions = {
  // overlayColor: "rgb(0,0,0)",
  // showThumbnails: false,
  // buttonsStyle: {
  //   buttonsBackgroundColor: "rgba(0,0,0,0.8)",
  //   buttonsIconColor: "rgba(255, 255, 255, 0.8)",
  // },
  // transitionSpeed: 100,
  settings: {
    overlayColor: "rgb(25, 136, 124)",
    autoplaySpeed: 1500,
    // @ts-ignore
    transitionSpeed: 900,
  },
  buttons: {
    backgroundColor: "#1b5245",
    iconColor: "rgba(126, 172, 139, 0.8)",
  },
  caption: {
    captionColor: "#a6cfa5",
    captionFontFamily: "Raleway, sans-serif",
    captionFontWeight: "300",
    captionTextTransform: "uppercase",
  },
};

const ImageGallery = ({
  pictures,
  name,
  date,
}: {
  pictures: {photos: Image[]} | string;
  name: string;
  date: string;
}): JSX.Element => {
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
          <Span>{date}</Span>, number of pictures:<Span>{pictures?.photos.length}</Span>
        </h5>
        <SimpleReactLightbox>
          <SRLWrapper options={simpleLightBoxOptions}>
            <GalleryDiv>
              {pictures?.photos.map((picture: Image) => {
                return (
                  <ImageDiv key={picture.id}>
                    <h4 style={{textAlign: "center", color: "darkviolet", margin: 0, padding: "5px"}}>
                      Picture ID: <Span>{picture.id}</Span>
                    </h4>

                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={"picture ID:" + picture.id}>
                          Click the image <strong>to enlarge</strong>.
                        </Tooltip>
                      }
                    >
                      <img src={picture.img_src} alt={"picture ID:" + picture.id}></img>
                    </OverlayTrigger>

                    <div>
                      <p>
                        Name of Camera: <span>{picture.camera.name}</span>
                      </p>
                      <p>
                        Full Camera Name: <span>{picture.camera.full_name}</span>
                      </p>
                      <p>
                        Earth date: <span>{picture.earth_date}</span>
                      </p>
                      <p>
                        Sol number: <span>{picture.sol}</span>
                      </p>
                    </div>
                  </ImageDiv>
                );
              })}
            </GalleryDiv>
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
    );
  // console.log("photosFromMarsRover:", photosFromMarsRover);

  return <React.Fragment>{photosFromMarsRover}</React.Fragment>;
};

export default ImageGallery;
