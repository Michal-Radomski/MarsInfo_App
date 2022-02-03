import React from "react";
import {Card, ListGroup} from "react-bootstrap";

const Container: React.FC<{data: State}> = ({data}: State): JSX.Element => {
  // console.log("data:", data);
  const renderedListItems: JSX.Element = data.map((item: Item) => {
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
