import {Popover, Button, OverlayTrigger} from "react-bootstrap";

const popover = (
  <Popover id="marsPopover">
    <Popover.Header as="h3">Info about Mars</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging. right?
    </Popover.Body>
  </Popover>
);

const MarsInfoPopover = (): JSX.Element => (
  <OverlayTrigger trigger={["hover", "click", "focus"]} placement="right-start" overlay={popover}>
    <Button variant="success">Info about Mars</Button>
  </OverlayTrigger>
);

export default MarsInfoPopover;
