import React from "react";
import {Button, Modal, Tab, Tabs, Card, ListGroup} from "react-bootstrap";

const Container = ({data}: State) => {
  console.log("data:", data);
  const renderedListItems = data.map((item: any) => {
    return (
      <ListGroup.Item key={item.id}>
        {item.content}
        <Card.Link href={item.link} target="_blank">
          {item.label}
        </Card.Link>
        .
      </ListGroup.Item>
    );
  });

  return <React.Fragment>{renderedListItems}</React.Fragment>;
};

export default Container;
