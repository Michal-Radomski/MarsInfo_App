import React from "react";

const CuriosityGallery = ({pictures}: State) => {
  const curiosityPhotos = typeof pictures === "string" ? pictures : "CuriosityGallery";
  // console.log("curiosityPhotos:", curiosityPhotos);

  return (
    <React.Fragment>
      <h3 style={{textAlign: "center", fontWeight: "bold", color: "red"}}>{curiosityPhotos}</h3>
    </React.Fragment>
  );
};

export default CuriosityGallery;
