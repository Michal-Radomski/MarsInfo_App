import styled from "styled-components";

const Div = styled.div`
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
`;
const H2 = styled.h2`
  text-align: center;
  color: palevioletred;
  margin: 5px;
`;

const Photo = (props: {photo: {title: string; url: string; explanation: string}}): JSX.Element => {
  if (!props.photo.title) {
    return <h2>No photo for selected day</h2>;
  }
  return (
    <Div>
      <H2>{props.photo.title}</H2>
      <img src={props.photo.url} alt={props.photo.title} />
      <p>{props.photo.explanation}</p>
    </Div>
  );
};

export default Photo;
