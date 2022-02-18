import React from "react";
import axios from "axios";
import {Accordion, AccordionContext, Card} from "react-bootstrap";
import {useAccordionButton} from "react-bootstrap/AccordionButton";

import Spinner from "../../../Spinner";
import PictureDatePicker from "./PictureDatePicker";

const API_KEY = process.env.REACT_APP_NASA_API_KEY as string;
// console.log("API_KEY:", API_KEY);

const selectedDate = "2020-01-01"; //-temp

const photosOpportunityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Opportunity/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;
const photosCuriosityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;
const photosSpiritUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Spirit/photos?earth_date=${selectedDate}&api_key=${API_KEY}&page=2`;

const URLs = [photosOpportunityUrl, photosCuriosityUrl, photosSpiritUrl];

const MarsPictures = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

  const styles = {
    Active: {
      color: "#0D6EFD",
      backgroundColor: "#CFE2FF",
      border: "2px solid #0D6EFD",
      padding: "4px",
      width: "100%",
      height: "100%",
    },
    InActive: {
      color: "black",
      backgroundColor: "whitesmoke",
      border: "none",
      padding: "4px",
      width: "100%",
      height: "100%",
    },
  };

  function CustomToggle({children, eventKey, callback}: any): JSX.Element {
    const {activeEventKey} = React.useContext(AccordionContext);
    const customAccordionOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <div onClick={customAccordionOnClick} style={isCurrentEventKey ? styles.Active : styles.InActive}>
        {children}
      </div>
    );
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <Accordion as="div" defaultActiveKey="accordionTab1" style={{border: "1px solid #0D6EFD", margin: "4px", padding: 0}}>
      <Card as="div" style={{border: "1px solid #0D6EFD", margin: "0px", padding: 0}}>
        <Card.Header as="div" style={{padding: 0, margin: 0}}>
          <CustomToggle eventKey="accordionTab1">
            <div style={{padding: "8px 16px"}}>
              <h1>Pictures from Curiosity Mars Rover</h1>
              <h2>Deployed 6 August 2012</h2>
              <div onClick={(event: {stopPropagation: () => void}) => event.stopPropagation()}>
                <PictureDatePicker />
              </div>
            </div>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="accordionTab1" as="div" style={{border: "1px solid #DC3545", margin: "2px"}}>
          <Card.Body as="div">Hello! I'm the body Card</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card as="div" style={{border: "1px solid #0D6EFD", margin: "0px", padding: 0}}>
        <Card.Header as="div" style={{padding: 0, margin: 0}}>
          <CustomToggle eventKey="accordionTab2">
            <div style={{padding: "8px 16px"}}>
              <h1>Pictures from Curiosity Mars Rover</h1>
              <h2>Deployed 6 August 2012</h2>
              <div onClick={(event: {stopPropagation: () => void}) => event.stopPropagation()}>
                <PictureDatePicker />
              </div>
            </div>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="accordionTab2" style={{border: "1px solid #DC3545", margin: "2px"}}>
          <Card.Body>Hello! I'm another body Card2</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default MarsPictures;
