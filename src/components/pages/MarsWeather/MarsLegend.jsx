import React from "react";
import * as L from "leaflet";
import "./Legend.css";
import Mola from "./Images/MOLA_elevation_key.png";

function MarsLegend({map}) {
  // console.log("map:", map);
  React.useEffect(() => {
    if (map) {
      const legend = L.control({position: "bottomleft"});

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = "<h4>This is the legend</h4> <br/><b>0=610 Pa</b>";
        const img = L.DomUtil.create("img", "image");
        img.src = Mola;
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
