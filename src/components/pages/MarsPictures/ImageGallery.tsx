import React from "react";

const ImageGallery = ({pictures, name}: {pictures: State; name: string}) => {
  // console.log("name, pictures:", name, pictures);
  const photosFromMarsRover =
    typeof pictures === "string" ? (
      <h3 style={{textAlign: "center", fontWeight: "bold", color: "#dd2e44"}}>{pictures}</h3>
    ) : (
      <React.Fragment>
        <p>
          Rover Name: {name}, Rover Id: {pictures.photos[0].rover.id}
        </p>
        {pictures?.photos.map((picture: any) => {
          return (
            <div key={picture.id}>
              <img width="200px" src={picture.img_src} alt={picture.id}></img>
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
