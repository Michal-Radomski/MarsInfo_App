import {Popover, Button, OverlayTrigger, CloseButton} from "react-bootstrap";
import styled from "styled-components";

const Div = styled.div`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    float: left;
    span {
      float: right;
      font-weight: bold;
      a {
        text-decoration: none;
        font-style: italic;
      }
    }
  }
`;

const popover: JSX.Element = (
  <Popover id="marsPopover" style={{minWidth: "550px"}}>
    <Popover.Header as="h3" style={{textAlign: "center", fontWeight: "bold", fontStyle: "italic"}}>
      Info about{" "}
      <a href="https://en.wikipedia.org/wiki/Mars" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
        Mars
      </a>
      <CloseButton onClick={() => document.body.click()} style={{float: "right", padding: "0px"}}></CloseButton>
    </Popover.Header>
    <Popover.Body>
      <Div>
        <p>
          Average orbital speed: <span>24.007 km/s</span>
        </p>
        <p>
          Satellites:{" "}
          <span>
            <a href="https://en.wikipedia.org/wiki/Phobos_(moon)" target="_blank" rel="noreferrer">
              Phobos
            </a>{" "}
            and{" "}
            <a href="https://en.wikipedia.org/wiki/Deimos_(moon)" target="_blank" rel="noreferrer">
              Deimos
            </a>
          </span>
        </p>
        <p>
          Mean radius: <span>3389.5 ± 0.2 km (0.531 Earths)</span>
        </p>
        <p>
          Mass:{" "}
          <span>
            6.4171×10<sup>23</sup> kg (0.107 Earths)
          </span>
        </p>
        <p>
          Surface gravity:{" "}
          <span>
            3.72076 m/s<sup>2</sup> (0.3794{" "}
            <a href="https://en.wikipedia.org/wiki/G-force" target="_blank" rel="noreferrer">
              g
            </a>
            )
          </span>
        </p>
        <p>
          Surface pressure: <span>0.636 (0.4-0.87) kPa (0.00628 atm)</span>
        </p>
        <p>
          Composition by volume: <span>95.97% carbon dioxide, 1.93% argon, 1.89% nitrogen</span>
        </p>
      </Div>
    </Popover.Body>
  </Popover>
);

const MarsInfoPopover = (): JSX.Element => (
  <OverlayTrigger trigger={"click"} placement="right-start" overlay={popover} rootClose={true}>
    <Button variant="outline-info">Info about Mars</Button>
  </OverlayTrigger>
);

export default MarsInfoPopover;
