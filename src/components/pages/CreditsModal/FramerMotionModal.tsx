import React from "react";
import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";

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
`;

const ModalContent = styled(motion.div)`
  color: blue;
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

const FramerMotionModal = ({selectedTab}: {selectedTab: string}): JSX.Element => {
  // console.log("selectedTab:", selectedTab);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  // console.log("setShowModal:", showModal);

  React.useEffect(() => {
    selectedTab === "Repo Link" ? setShowModal(true) : setShowModal(false);
    // console.log("selectedTab:", selectedTab);
  }, [selectedTab]);

  return (
    <ModalContainer>
      <AnimatePresence>
        {showModal && (
          <ModalDiv
            // initial={{opacity: 0, y: 60, scale: 0.5}}
            // animate={{
            //   opacity: 1,
            //   y: 0,
            //   scale: 1,
            //   transition: {type: "spring", stiffness: 400, duration: 1.0, delay: 0.5, damping: 5},
            // }}
            // exit={{opacity: 0, scale: 0.5, transition: {duration: 0.6}}}
            initial={modalTransition.hidden}
            animate={modalTransition.visible}
            exit={modalTransition.exit}
          >
            <ModalContent initial={{y: -30, opacity: 0}} animate={{y: 0, opacity: 1, transition: {delay: 1.0}}}>
              <h2>ModalContent</h2>
            </ModalContent>
          </ModalDiv>
        )}
      </AnimatePresence>
    </ModalContainer>
  );
};

export default FramerMotionModal;
