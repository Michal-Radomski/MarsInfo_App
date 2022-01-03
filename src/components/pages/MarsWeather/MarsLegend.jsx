import React from "react";
import * as L from "leaflet";
import "./Legend.css";
import MOLA_elevation from "./Images/MOLA_elevation_key.png";

function MarsLegend({map}) {
  // console.log("map:", map);
  React.useEffect(() => {
    if (map) {
      const legend = L.control({position: "bottomleft"});

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML =
          "<h5 style='color:orangered;text-align:center; margin: 0.2rem'>Legend : MOLA Elevation Key</h5> <br/><b>The zero point of elevation on Mars, is the elevation at which the atmosphere pressure is 610 Pascals</b><br/>";
        const img = L.DomUtil.create("img", "image");
        img.src = MOLA_elevation;
        img.style.width = "512px";
        img.style.height = "84px";
        div.appendChild(img);

        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default MarsLegend;
