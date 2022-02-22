import React from "react";

const CuriosityGallery = ({pictures}: State) => {
  const curiosityPhotos =
    typeof pictures === "string" ? (
      <h3 style={{textAlign: "center", fontWeight: "bold", color: "red"}}>{pictures}</h3>
    ) : (
      pictures?.photos.map((picture: any) => {
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
      })
    );
  // console.log("curiosityPhotos:", curiosityPhotos);

  return <React.Fragment>{curiosityPhotos}</React.Fragment>;
};

export default CuriosityGallery;
