import {Popover, Button, OverlayTrigger} from "react-bootstrap";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Body>
  </Popover>
);

const MarsInfoPopover = (): JSX.Element => (
  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success">Info about Mars</Button>
  </OverlayTrigger>
);

export default MarsInfoPopover;
