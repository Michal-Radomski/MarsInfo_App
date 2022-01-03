import React from "react";
import * as L from "leaflet";
import MOLA_elevation from "./Images/MOLA_elevation_key.png";

function MarsLegend({map}) {
  // console.log("map:", map);
  React.useEffect(() => {
    if (map) {
      const legend = L.control({position: "bottomleft"});

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "");
        div.style.padding = "0 5px";
        div.style.backgroundColor = "whitesmoke";
        div.style.borderRadius = " 0 5px 0 0 ";
        div.style.opacity = "0.8";
        div.style.textAlign = "left";
        div.style.color = "#444";
        div.style.width = "522px";
        div.style.margin = 0;
        div.innerHTML =
          "<h5 style='color:orangered;text-align:center; margin: 0.2rem'>Legend:<a href='https://en.wikipedia.org/wiki/Mars_Orbiter_Laser_Altimeter' target='_blank' style='text-decoration: none; font-weight: bolder'> MOLA </a>Elevation Key</h5> <br/><b>The zero point of elevation on Mars, is the elevation at which the atmosphere pressure is 610 Pascals</b><br/>";
        const img = L.DomUtil.create("img", "");
        img.src = MOLA_elevation;
        img.style.width = "512px";
        img.style.height = "84px";
        img.style.margin = "0 !important;";
        img.style.padding = "0 !important;";
        div.appendChild(img);

        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default MarsLegend;
