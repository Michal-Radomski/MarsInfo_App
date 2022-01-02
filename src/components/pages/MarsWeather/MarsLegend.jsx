import React from "react";
import * as L from "leaflet";
import "./Legend.css";

function MarsLegend({map}) {
  console.log("map:", map);
  React.useEffect(() => {
    if (map) {
      const legend = L.control({position: "topright"});

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = "<h4>This is the legend</h4> <br/><b>0=610 Pa</b>";
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default MarsLegend;
