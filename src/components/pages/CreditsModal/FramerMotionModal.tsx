import React from "react";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {Nav, OverlayTrigger, Tooltip} from "react-bootstrap";

const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const ModalDiv = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: wheat;
  border: 1px solid #0b5ed7;
`;

const ModalDivInternal = styled(motion.div)`
  position: relative;
  z-index: 3;
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: wheat;
  border: 1px solid #0b5ed7;
`;

const ModalContent = styled(motion.div)`
  color: #0b5ed7;
`;

const ModalContentLink = styled(motion.div)`
  color: inherit;
  background-color: inherit;
`;
const StyledNavLink = styled(Nav.Link)`
  font-size: 2.5rem;
  text-align: center;
  padding: 0px;
  font-weight: bold;
  font-style: italic;
  &:hover {
    text-decoration: none;
  }
`;

const modalTransition = {
  hidden: {
    transform: "scale(0) rotate(720deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotate(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotate(-720deg)",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const FramerMotionModal: React.FC<{selectedTab: string}> = ({selectedTab}: {selectedTab: string}): JSX.Element => {
  // console.log("selectedTab:", selectedTab);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  // console.log("setShowModal:", showModal);
  const [animationDone, setAnimationDone] = React.useState<boolean>(false);

  function onComplete(): void {
    // console.log("animationDone1:", animationDone);
    setTimeout(() => {
      setAnimationDone(true);
      // console.log("animationDone2:", animationDone);
    }, 400);
  }

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    selectedTab === "Repo Link" ? setShowModal(true) : (setShowModal(false), setAnimationDone(false));
    // console.log("selectedTab:", selectedTab);
    // console.log("animationDone:", animationDone);
  }, [animationDone, selectedTab]);

  const renderTooltip = (props: React.RefAttributes<HTMLDivElement>): JSX.Element => (
    <Tooltip id="button-tooltip" {...props}>
      Click to see the repo...
    </Tooltip>
  );

  return (
    <ModalContainer>
      <AnimatePresence>
        {showModal && (
          <ModalDiv
            initial={modalTransition.hidden}
            animate={modalTransition.visible}
            exit={modalTransition.exit}
            onAnimationComplete={onComplete}
            style={{
              backgroundColor: animationDone ? "transparent" : "wheat",
              border: animationDone ? "none" : "border: 1px solid #0b5ed7",
            }}
          >
            <ModalDivInternal
              initial={{opacity: 0, y: 100, scale: 0.5}}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {type: "spring", stiffness: 400, duration: 1.0, delay: 0.75, damping: 5},
              }}
              exit={{opacity: 0, scale: 0.5, transition: {duration: 0.6}}}
            >
              <ModalContent
                initial={{y: -60, opacity: 0}}
                animate={{
                  y: [0, 45, -32, 20, -10, 5, -3, -2, 0],
                  opacity: 1,
                  transition: {delay: 2.0, duration: 1.5},
                  rotate: [0, 10, -10, 8, -8, 5, -5, 0],
                }}
              >
                <h4 style={{textAlign: "center", margin: 0}}>Link to the App Repo:</h4>
                <ModalContentLink
                  whileHover={{scale: 1.2, rotate: 180, transition: {duration: 0.5}}}
                  whileTap={{scale: 0.8, rotate: 0}}
                  initial={{y: -60, opacity: 0}}
                  animate={{
                    y: [0, 45, -32, 20, -10, 5, -3, -2, 0],
                    opacity: 1,
                    transition: {delay: 2.0, duration: 1.8},
                    rotate: [0, -15, 15, -10, 10, -5, 5, -2, 0],
                  }}
                >
                  <OverlayTrigger placement="bottom" delay={{show: 250, hide: 400}} overlay={renderTooltip}>
                    <StyledNavLink as="a" href="https://github.com/Michal-Radomski/MarsInfo_App" target="_blank">
                      Mars Info App
                    </StyledNavLink>
                  </OverlayTrigger>
                </ModalContentLink>
              </ModalContent>
            </ModalDivInternal>
          </ModalDiv>
        )}
      </AnimatePresence>
    </ModalContainer>
  );
};

export default FramerMotionModal;
