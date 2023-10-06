import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 1;
  }
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  border: 1px solid transparent;
  cursor: pointer;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const box = {
  enter: (index: number) => {
    return {
      scale: 1,
      originX: index % 2 === 1 ? 1 : 0,
      originY: index <= 2 ? 1 : 0,
    };
  },
  hover: (index: number) => {
    return {
      scale: 1.1,
    };
  },
  exit: {},
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [showingCircle, setShowingCircle] = useState<string>("2");
  const toggleShowingCircle = () => {
    const value = showingCircle === "2" ? "3" : "2";
    setShowingCircle(value);
  };
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            custom={n}
            variants={box}
            initial="enter"
            whileHover="hover"
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
          >
            {["2", "3"].includes(n) && showingCircle === n ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{ width: 300, height: 200, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
        <Button
          animate={{ scale: showingCircle === "2" ? 1 : 1.2, color: showingCircle === "2" ? "blue" : "orange" }}
          onClick={() => toggleShowingCircle()}
        >
          Switch
        </Button>
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
