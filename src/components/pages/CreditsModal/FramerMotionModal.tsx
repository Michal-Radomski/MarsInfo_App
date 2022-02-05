import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import React from "react";

const ModalBox = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: wheat;
`;

const ModalContent = styled(motion.div)`
  color: blue;
`;

const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RepoModal = ({showModal}: {showModal: boolean}): JSX.Element => {
  // console.log("showModal:", showModal);
  return (
    <ModalContainer>
      <AnimatePresence>
        {showModal && (
          <ModalBox
            initial={{opacity: 0, y: 60, scale: 0.5}}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {type: "spring", stiffness: 400, duration: 1.0},
            }}
            exit={{opacity: 0, scale: 0.5, transition: {duration: 0.6}}}
          >
            <ModalContent initial={{y: -30, opacity: 0}} animate={{y: 0, opacity: 1, transition: {delay: 1.0}}}>
              <h2>ModalContent</h2>
            </ModalContent>
          </ModalBox>
        )}
      </AnimatePresence>
    </ModalContainer>
  );
};

const FramerMotionModal = ({selectedTab}: {selectedTab: string}): JSX.Element => {
  // console.log("selectedTab:", selectedTab);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  // console.log("setShowModal:", showModal);

  React.useEffect(() => {
    selectedTab === "Repo Link" ? setShowModal(true) : setShowModal(false);
    console.log("selectedTab:", selectedTab);
  }, [selectedTab]);

  return (
    <ModalContainer>
      {/* passing 'showModal' as a prop to RepoModal component */}
      <RepoModal showModal={showModal} />
    </ModalContainer>
  );
};

export default FramerMotionModal;
