import React from "react";

const ImageGallery = ({pictures}: State) => {
  console.log("pictures:", pictures);
  const photosFromMarsRover =
    typeof pictures === "string" ? (
      <h3 style={{textAlign: "center", fontWeight: "bold", color: "#dd2e44"}}>{pictures}</h3>
    ) : (
      pictures?.photos.map((picture: any) => {
        return (
          <>
            {" "}
            <p>test</p>
            <div key={picture.id}>
              <img width="200px" src={picture.img_src} alt={picture.id}></img>
              <p>
                Name of Camera: {picture.camera.full_name} ({picture.camera.name})
              </p>
              <p>Earth date: {picture.earth_date}</p>
              <p>Sol: {picture.sol}</p>
            </div>
          </>
        );
      })
    );
  // console.log("photosFromMarsRover:", photosFromMarsRover);

  return <React.Fragment>{photosFromMarsRover}</React.Fragment>;
};

export default ImageGallery;
