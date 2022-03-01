import React from "react";
import {gsap} from "gsap";

import "./NasaModel.scss";

const FlyingText = (): JSX.Element => {
  const content = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let tl = gsap.timeline();
    tl.to(content.current, {top: "-100%", duration: 15}).to(content.current, {opacity: 0, duration: 1.5});
  }, []);

  return (
    <React.Fragment>
      <div className="divMain">
        <section className="move">
          <div className="info" ref={content}>
            <p>
              The 3D .glb Model of Mars was taken from:
              <br />
              <a
                href="https://solarsystem.nasa.gov/resources/2372/mars-3d-model"
                target="_blank"
                rel="noreferrer"
                style={{color: "orange", fontWeight: "bold", fontStyle: "italic", cursor: "pointer"}}
              >
                NASA - Solar System Exploration
              </a>
            </p>
            <p>
              Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.
              <br />
              <a
                href="https://en.wikipedia.org/wiki/Mars"
                target="_blank"
                rel="noreferrer"
                style={{color: "orange", fontWeight: "bold", fontStyle: "italic", cursor: "pointer"}}
              >
                Read more on Wikipedia...
              </a>
            </p>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default FlyingText;
