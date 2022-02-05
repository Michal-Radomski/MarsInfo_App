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

const ToggleBtn = styled(motion.button)`
  cursor: pointer;
  font-size: 20px;
  color: whitesmoke;
  padding: 8px 16px;
  margin-top: 20px;
  background: green;
  border-radius: 12px;
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

const FramerMotionModal = (): JSX.Element => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const displayModal = (): void => {
    setShowModal(!showModal);
    document.getElementById("btn")!.style.visibility = "hidden";
  };

  document.body.addEventListener("click", () => {
    if (showModal) {
      setShowModal(false);
    }
  });

  return (
    <ModalContainer>
      <ToggleBtn
        id="btn"
        initial={{x: -700}}
        animate={{
          x: 0,
          transition: {duration: 0.1},
        }}
        onClick={displayModal}
      >
        Toggle Modal
      </ToggleBtn>
      {/* passing 'showModal' as a prop to RepoModal component */}
      <RepoModal showModal={showModal} />
    </ModalContainer>
  );
};

export default FramerMotionModal;
