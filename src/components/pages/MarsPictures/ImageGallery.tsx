import React from "react";
import styled from "styled-components";
import SimpleReactLightbox, {SRLWrapper, SRLWrapperOptions} from "simple-react-lightbox";
import {Tooltip, OverlayTrigger} from "react-bootstrap";

import "./ImageGallery.scss";

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
  settings: {
    overlayColor: "rgba(125,125,125, 0.9)",
    autoplaySpeed: 1500,
    slideSpringValues: [250, 250],
    lightboxTransitionSpeed: 1.0,
  },
  buttons: {
    backgroundColor: "rgba(30,30,36,0.8)",
    iconColor: "rgba(255, 255, 255, 0.8)",
    iconPadding: "10px",
    showAutoplayButton: true,
    showCloseButton: true,
    showDownloadButton: false,
    showFullscreenButton: true,
    showNextButton: true,
    showPrevButton: true,
    showThumbnailsButton: true,
    size: "40px",
  },
  caption: {
    captionColor: "darkviolet",
    captionFontWeight: "bolder",
    showCaption: true,
    captionAlignment: "center",
    captionFontSize: "28px",
    captionFontStyle: "italic",
  },
  thumbnails: {
    showThumbnails: true,
    thumbnailsAlignment: "center",
    thumbnailsContainerBackgroundColor: "transparent",
    thumbnailsContainerPadding: "10px",
    thumbnailsGap: "0 4px",
    thumbnailsIconColor: "#eee",
    thumbnailsOpacity: 0.4,
    thumbnailsPosition: "bottom",
    thumbnailsSize: ["100px", "80px"],
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
                      delay={{show: 250, hide: 400}}
                      placement="top"
                      overlay={
                        <Tooltip id={"Picture ID:" + picture.id} className="customTooltip">
                          Click on the image ID:{" "}
                          <b>
                            <i>{picture.id}</i>
                          </b>{" "}
                          to enlarge
                        </Tooltip>
                      }
                    >
                      <img src={picture.img_src} alt={"Picture ID: " + picture.id}></img>
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
