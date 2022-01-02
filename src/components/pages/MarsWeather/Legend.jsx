import {useEffect} from "react";
import L from "leaflet";
import "./Legend.css";

function Legend({map}) {
  console.log(map);
  useEffect(() => {
    if (map) {
      const legend = L.control({position: "bottomright"});

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = "<h4>This is the legend</h4>" + "<b>0=610 Pa</b>";
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
