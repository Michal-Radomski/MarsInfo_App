import React from "react";
import axios from "axios";
import {Accordion, Card} from "react-bootstrap";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {FaMinusSquare, FaPlusSquare} from "react-icons/fa";

import Spinner from "../../../Spinner";
import PictureDatePicker from "./PictureDatePicker";
import CustomToggle from "./CustomToggle";
import ImageGallery from "./ImageGallery";
import {
  SET_MARS_PICTURES_CURIOSITY,
  SET_MARS_PICTURES_INACTIVE_ROVERS,
  SET_MARS_DATE_CURIOSITY,
  SET_MARS_DATE_INACTIVE_ROVERS,
} from "../../../redux/actions";

const API_KEY = process.env.REACT_APP_NASA_API_KEY as string;
// console.log("API_KEY:", API_KEY);

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
  padding: 0;
  background-color: inherit;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
`;

const MarsPictures = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const dispatch: Dispatch = useDispatch();

  const accordionActiveTab: string | null = useSelector((state: State) => state?.rootReducer?.MarsPictures?.activeTab);
  //  console.log("accordionActiveTab:", accordionActiveTab)

  const MarsDateCuriosity: string = useSelector(
    (state: State) => state?.rootReducer?.MarsPictures_Curiosity?.CuriosityRoverDate
  );
  const MarsPicturesCuriosity: State = useSelector(
    (state: State) => state?.rootReducer?.MarsPictures_Curiosity?.CuriosityRoverPhotos
  );
  const MarsDateInActiveRovers: string = useSelector(
    (state: State) => state?.rootReducer?.MarsPictures_InActiveRovers?.inActiveRoversDate
  );
  const MarsPicturesInActiveRovers: State = useSelector(
    (state: State) => state?.rootReducer?.MarsPictures_InActiveRovers?.inActiveRoversPhotos
  );

  // console.log("MarsPicturesCuriosity:", MarsPicturesCuriosity);
  // console.log("MarsDateCuriosity:", MarsDateCuriosity);
  // console.log("MarsPicturesInActiveRovers:", MarsPicturesInActiveRovers);
  // console.log("MarsDateInActiveRovers:", MarsDateInActiveRovers);

  //- Dates for Mars Rovers Photos
  //* Spirit Photos: 2004-01-05 -> ???
  //* Opportunity Photos: 2004-01-26 -> 2018-06-05
  //* Curiosity Photos: since 2012-08-06

  //* InActive Rovers Photos:
  const [inActiveRoversDate, setInActiveRoversDate] = React.useState<string>("2004-01-04");
  const [inActiveRoversPhotos, setInActiveRoversPhotos] = React.useState<State>({});
  // console.log("inActiveRoversDate:", inActiveRoversDate);
  // console.log("inActiveRoversPhotos:", inActiveRoversPhotos);

  const photosOpportunityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Opportunity/photos?earth_date=${inActiveRoversDate}&api_key=${API_KEY}&page=2`;
  const photosSpiritUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Spirit/photos?earth_date=${inActiveRoversDate}&api_key=${API_KEY}&page=2`;

  //* Curiosity Rover Photos:
  const [CuriosityRoverDate, setCuriosityRoverDate] = React.useState<string>("2012-08-07");
  const [CuriosityRoverPhotos, setCuriosityRoverPhotos] = React.useState<State>({});
  // console.log("CuriosityRoverDate:", CuriosityRoverDate);
  // console.log("CuriosityRoverPhotos:", CuriosityRoverPhotos);

  const photosCuriosityUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?earth_date=${CuriosityRoverDate}&api_key=${API_KEY}&page=2`;

  const changeDateCuriosity = async (dateFromDatePicker: Date) => {
    const formattedDate = dateFromDatePicker.toISOString().split("T")[0] as string;
    await setCuriosityRoverDate(formattedDate);
  };

  const changeDateInActiveRovers = async (dateFromDatePicker: Date) => {
    const formattedDate = dateFromDatePicker.toISOString().split("T")[0] as string;
    await setInActiveRoversDate(formattedDate);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, [isLoading]);

  React.useEffect(() => {
    const URLs = [photosOpportunityUrl, photosSpiritUrl];

    const fetchMarsPicturesInActiveRovers = async () => {
      // console.log("fetchMarsPicturesInActiveRovers()");
      try {
        const response = await axios.all(URLs.map((url) => axios.get(url))).then((data) => {
          // console.log("data:", data);
          return data;
        });
        // await console.log("response:", response);
        const marsInActiveRoversPictures = await response.map((marsInActiveRoverPictures) => marsInActiveRoverPictures.data);
        // await console.log("marsInActiveRoversPictures:", marsInActiveRoversPictures);
        const photosOpportunity =
          marsInActiveRoversPictures[0].photos.length > 0
            ? marsInActiveRoversPictures[0]
            : "No photos taken by Opportunity Mars Rover for the selected day";
        const photosSpirit =
          marsInActiveRoversPictures[1].photos.length > 0
            ? marsInActiveRoversPictures[1]
            : "No photos taken by Spirit Mars Rover for the selected day";
        // await console.log("photosOpportunity:", photosOpportunity, "photosSpirit:", photosSpirit);
        await setInActiveRoversPhotos({
          OpportunityPhotos: photosOpportunity,
          SpiritPhotos: photosSpirit,
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOpportunityPhotos = async () => {
      await axios.get(photosCuriosityUrl).then(
        (fetchResponse) => {
          // console.log("fetchResponse.data:", fetchResponse.data);
          // console.log("Curiosity Photos Fetching");
          const CuriosityPhotos =
            fetchResponse?.data?.photos.length > 0
              ? fetchResponse?.data
              : "No photos taken by Curiosity Mars Rover for the selected day";
          setCuriosityRoverPhotos({CuriosityPhotos: CuriosityPhotos});
        },
        (error) => {
          console.log(error);
        }
      );
    };

    fetchMarsPicturesInActiveRovers();
    fetchOpportunityPhotos();
  }, [photosCuriosityUrl, photosOpportunityUrl, photosSpiritUrl]);

  React.useEffect(() => {
    dispatch({type: SET_MARS_DATE_CURIOSITY, payload: CuriosityRoverDate});
    dispatch({type: SET_MARS_DATE_INACTIVE_ROVERS, payload: inActiveRoversDate});
    dispatch({type: SET_MARS_PICTURES_CURIOSITY, payload: CuriosityRoverPhotos});
    dispatch({type: SET_MARS_PICTURES_INACTIVE_ROVERS, payload: inActiveRoversPhotos});
    setTimeout(() => {
      localStorage.setItem("CuriosityRoverDate", JSON.stringify(MarsDateCuriosity));
      localStorage.setItem("MarsPicturesCuriosity", JSON.stringify(MarsPicturesCuriosity));
      localStorage.setItem("MarsDateInActiveRovers", JSON.stringify(MarsDateInActiveRovers));
      localStorage.setItem("MarsPicturesInActiveRovers", JSON.stringify(MarsPicturesInActiveRovers));
    }, 1000);
  });

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
                <div style={{top: "50%", position: "absolute", transform: "translateY(-50%)"}}>
                  {accordionActiveTab === "accordionTab1" ? (
                    <FaMinusSquare size={32} fill="indigo" />
                  ) : (
                    <FaPlusSquare size={32} fill="green" />
                  )}
                </div>
                <div style={{marginLeft: "50px"}}>
                  <h3>
                    <span style={{color: "darkviolet"}}>Click here</span> to open/ close photos from:{" "}
                    <span>Curiosity Mars Rover</span>
                  </h3>
                  <p>
                    Status: <span>Operational</span>, photos taken since:{" "}
                    <span style={{color: "darkviolet"}}>2012-08-06</span>, current selected date:{" "}
                    <span style={{color: "maroon"}}>{CuriosityRoverDate}</span>
                  </p>
                  <p>
                    Deployed: <span>August 6, 2012</span>
                  </p>
                </div>
              </DivInner>
              <div
                onClick={(event: {stopPropagation: () => void}) => event.stopPropagation()}
                style={{
                  textAlign: "center",
                  color: "darkviolet",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h5 style={{fontWeight: "bold"}}>Select date:</h5>
                <PictureDatePicker
                  selectedDate={CuriosityRoverDate}
                  minDate="2012-08-05"
                  changeDate={changeDateCuriosity}
                  today="Today"
                />
              </div>
            </Div>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse
          eventKey="accordionTab1"
          as="div"
          style={{border: "1px solid #DC3545", margin: "2px", backgroundColor: "#f3f3e3"}}
        >
          <Card.Body as="div">
            <h3 style={{textAlign: "center", fontWeight: "bold"}}>Pictures taken by Curiosity Mars Rover</h3>
            <ImageGallery pictures={CuriosityRoverPhotos?.CuriosityPhotos} name="Curiosity" date={CuriosityRoverDate} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card as="div" style={{border: "1px solid #0D6EFD", margin: "0px", padding: 0}}>
        <Card.Header as="div" style={{padding: 0, margin: 0}}>
          <CustomToggle eventKey="accordionTab2">
            <Div>
              <DivInner>
                <div style={{top: "50%", position: "absolute", transform: "translateY(-50%)"}}>
                  {accordionActiveTab === "accordionTab2" ? (
                    <FaMinusSquare size={32} fill="indigo" />
                  ) : (
                    <FaPlusSquare size={32} fill="green" />
                  )}
                </div>
                <div style={{marginLeft: "50px"}}>
                  <h3>
                    <span style={{color: "darkviolet"}}>Click here</span> to open/ close photos from:{" "}
                    <span>Opportunity</span> and <span>Spirit</span> rovers on Mars
                  </h3>
                  <p>
                    Status: <span>Missions Are Complete</span>, photos taken in between:{" "}
                    <span style={{color: "darkviolet"}}>2004-01-05 - 2018-06-05</span>, current selected date:{" "}
                    <span style={{color: "maroon"}}>{inActiveRoversDate}</span>
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
                style={{
                  textAlign: "center",
                  color: "darkviolet",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h5 style={{fontWeight: "bold"}}>Select date:</h5>
                <PictureDatePicker
                  selectedDate={inActiveRoversDate}
                  minDate="2004-01-04"
                  changeDate={changeDateInActiveRovers}
                  today=""
                />
              </div>
            </Div>
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse
          eventKey="accordionTab2"
          as="div"
          style={{border: "1px solid #DC3545", margin: "2px", backgroundColor: "#f3f3e3"}}
        >
          <Card.Body>
            <h3 style={{textAlign: "center", fontWeight: "bold"}}>Pictures taken by Opportunity Mars Rover</h3>
            <ImageGallery pictures={inActiveRoversPhotos?.OpportunityPhotos} name="Opportunity" date={inActiveRoversDate} />
            <h3 style={{textAlign: "center", fontWeight: "bold"}}>Pictures taken by Spirit Mars Rover</h3>
            <ImageGallery pictures={inActiveRoversPhotos?.SpiritPhotos} name="Spirit" date={inActiveRoversDate} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default MarsPictures;
