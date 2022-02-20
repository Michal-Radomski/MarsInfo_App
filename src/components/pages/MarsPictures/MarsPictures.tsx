import React from "react";
import axios from "axios";
import {Accordion, Card} from "react-bootstrap";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {FaMinusSquare, FaPlusSquare} from "react-icons/fa";

import Spinner from "../../../Spinner";
import PictureDatePicker from "./PictureDatePicker";
import CustomToggle from "./CustomToggle";

const API_KEY = process.env.REACT_APP_NASA_API_KEY as string;
// console.log("API_KEY:", API_KEY);

const selectedDate = "2020-01-01"; //-temp

const photosOpportunityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Opportunity/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;
const photosCuriosityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;
const photosSpiritUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Spirit/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;

const URLs = [photosOpportunityUrl, photosCuriosityUrl, photosSpiritUrl];

const Div = styled.div`
  padding: 8px 16px;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p,
  h3 {
    margin: 0px;
  }
  span {
    font-weight: bolder;
    font-style: italic;
  }
  &:hover {
    background-color: wheat;
    color: blue;
  }
`;
const DivInner = styled.div`
  padding: 8px 16px;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
`;

const MarsPictures = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const accordionActiveTab: string | null = useSelector((state: State) => state?.rootReducer?.MarsPictures?.activeTab);
  // console.log("accordionActiveTab:", accordionActiveTab);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  React.useEffect(() => {
    const fetchMarsPictures = async () => {
      try {
        const response = await axios.all(URLs.map((url) => axios.get(url))).then((data) => {
          // console.log("data:", data);
          return data;
        });
        // await console.log("response:", response);
        const marsRoversPictures = await response.map((marsRoverPictures) => marsRoverPictures.data.photos);
        await console.log("marsRoversPictures:", marsRoversPictures);
        const photosOpportunity =
          marsRoversPictures[0].length > 0 ? marsRoversPictures[0] : "No Photos for the Selected Day";
        const photosCuriosity = marsRoversPictures[1].length > 0 ? marsRoversPictures[1] : "No Photos for the Selected Day";
        const photosSpirit = marsRoversPictures[2].length > 0 ? marsRoversPictures[2] : "No Photos for the Selected Day";
        await console.log(
          "photosOpportunity:",
          photosOpportunity,
          "photosCuriosity:",
          photosCuriosity,
          "photosSpirit:",
          photosSpirit
        );
        // // await console.log("marsWeatherModified:", marsWeatherModified);
        // await this.setState({
        //   PerseveranceWeather: marsWeatherModified.PerseveranceWeather,
        //   CuriosityWeather: marsWeatherModified.CuriosityWeather,
        //   //* Alternative version of partial setState
        //   // InSightWeather: {InSight_Weather_Data: marsWeatherModified.InSightWeather, InSight_sol: this.state.InSightWeather.InSight_sol},
        //   //* Setting the State partially
        //   InSightWeather: {...this.state.InSightWeather, InSight_Weather_Data: marsWeatherModified.InSightWeather},
        //   loaded: true,
        //   userPosition: userPosition,
        // });
        // // await console.log("this.state:", this.state);
      } catch (error) {
        console.error(error);
      }
    };
    // fetchMarsPictures();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Accordion as="div" defaultActiveKey="accordionTab1" style={{border: "1px solid #0D6EFD", margin: "6px", padding: 0}}>
      <Card as="div" style={{border: "1px solid #0D6EFD", margin: "0px", padding: 0}}>
        <Card.Header as="div" style={{padding: 0, margin: 0}}>
          <CustomToggle eventKey="accordionTab1">
            {/* {console.log("CustomToggle:", CustomToggle)} */}
            <Div>
              <DivInner>
                <div style={{top: "50%", position: "absolute", transform: "translateY(-50%"}}>
                  {accordionActiveTab === "accordionTab1" ? <FaMinusSquare /> : <FaPlusSquare />}
                </div>
                <div style={{marginLeft: "60px"}}>
                  <h3>
                    <span style={{color: "darkviolet"}}>Click here</span> to see photos from:{" "}
                    <span>Curiosity Mars Rover</span>
                  </h3>
                  <p>
                    Status: <span>Operational</span>
                  </p>
                  <p>
                    Deployed: <span>August 6, 2012</span>
                  </p>
                </div>
              </DivInner>
              <div
                onClick={(event: {stopPropagation: () => void}) => event.stopPropagation()}
                style={{textAlign: "center", color: "maroon"}}
              >
                <h5 style={{fontWeight: "bold"}}>Select date:</h5>
                <PictureDatePicker />
              </div>
            </Div>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse
          eventKey="accordionTab1"
          as="div"
          style={{border: "1px solid #DC3545", margin: "2px", backgroundColor: "lightyellow"}}
        >
          <Card.Body as="div">Hello! I'm the body Card</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card as="div" style={{border: "1px solid #0D6EFD", margin: "0px", padding: 0}}>
        <Card.Header as="div" style={{padding: 0, margin: 0}}>
          <CustomToggle eventKey="accordionTab2">
            <Div>
              <DivInner>
                <div style={{top: "50%", position: "absolute", transform: "translateY(-50%"}}>
                  {accordionActiveTab === "accordionTab2" ? <FaMinusSquare /> : <FaPlusSquare />}
                </div>
                <div style={{marginLeft: "60px"}}>
                  <h3>
                    <span style={{color: "darkviolet"}}>Click here</span> to see photos from: <span>Opportunity</span> and{" "}
                    <span>Spirit</span> rovers on Mars
                  </h3>
                  <p>
                    Status: <span>Missions Are Complete</span>
                  </p>
                  <p>
                    <span>Opportunity:</span> Landing Date: <span>January 25, 2004</span>, Last contact:{" "}
                    <span>June 10, 2018</span>
                  </p>
                  <p>
                    <span>Spirit:</span> Landing Date: <span>January 4, 2004</span>, Last contact:{" "}
                    <span>March 22, 2010</span>
                  </p>
                </div>
              </DivInner>
              <div
                onClick={(event: {stopPropagation: () => void}) => event.stopPropagation()}
                style={{textAlign: "center", color: "maroon"}}
              >
                <h5 style={{fontWeight: "bold"}}>Select date:</h5>
                <PictureDatePicker />
              </div>
            </Div>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse
          eventKey="accordionTab2"
          as="div"
          style={{border: "1px solid #DC3545", margin: "2px", backgroundColor: "lightyellow"}}
        >
          <Card.Body>Hello! I'm another body Card2</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default MarsPictures;
