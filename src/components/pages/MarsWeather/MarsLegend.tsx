import React from "react";
import {Control, DomUtil} from "leaflet";
import MOLA_elevation from "./Images/MOLA_elevation_key.png";

interface Map {
  map: State;
}

function MarsLegend({map}: Map): JSX.Element {
  // console.log("map:", map);

  React.useEffect(() => {
    if (map) {
      const legend = new Control({position: "bottomleft"});

      legend.onAdd = () => {
        const div = DomUtil.create("div", "");
        div.style.padding = "0 5px";
        div.style.backgroundColor = "white";
        div.style.borderRadius = " 0 5px 0 0 ";
        div.style.opacity = "0.75";
        div.style.textAlign = "left";
        div.style.color = "#444";
        div.style.width = "522px";
        div.style.margin = "0";
        div.innerHTML =
          "<h5 style='color:orangered;text-align:center; margin: 0.2rem'>Legend:<a href='https://en.wikipedia.org/wiki/Mars_Orbiter_Laser_Altimeter' target='_blank' style='text-decoration: none; font-weight: bolder'> MOLA </a>Elevation Key</h5> <br/><b>The zero point of elevation on Mars, is the elevation at which the atmosphere pressure is 610 Pascals</b><br/>";
        const img = DomUtil.create("img", "");
        img.src = MOLA_elevation;
        img.style.width = "512px";
        img.style.height = "84px";
        img.style.margin = "0 !important;";
        img.style.padding = "0 !important;";
        img.style.opacity = "0.9";
        div.appendChild(img);

        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null as any;
}

export default MarsLegend;
