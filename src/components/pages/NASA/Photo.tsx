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

const VideoDiv = styled.div`
  overflow: hidden;
  padding-bottom: 56.25%;
  position: relative;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

const Photo = (props: {photo: {title: string; url: string; explanation: string}}): JSX.Element => {
  if (!props.photo.title) {
    return <h2>No photo/video for selected day</h2>;
  }
  return (
    <Div>
      <H2>{props.photo.title}</H2>
      {/* {console.log("props.photo.url:", props.photo.url)} */}
      {props.photo.url.charAt(props.photo.url.length - 4) === "." ? (
        <>
          <img src={props.photo.url} alt={props.photo.title} />
          <p style={{textAlign: "justify"}}>{props.photo.explanation}</p>
        </>
      ) : (
        <VideoDiv>
          <iframe
            width="100%"
            height="100%"
            src={props.photo.url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
            title="NASA Video"
          />
        </VideoDiv>
      )}
    </Div>
  );
};

export default Photo;
