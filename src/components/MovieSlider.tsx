import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const Slider = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 60px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: relative;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Title = styled.div`
  padding: 20px 60px;
  display: table-cell;
  font-size: 1.4vw;
  line-height: 1.25vw;
  vertical-align: bottom;
`;

const ArrowBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  cursor: pointer;
  font-size: 66px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

interface IMovieSliderProps {
  data: any;
  leaving: boolean;
  title: string;
  detailPrefix?: string;
  toggleLeaving: () => void;
}

const offset = 6;

const MovieSlider = ({ data, leaving, title, detailPrefix = "/movies", toggleLeaving }: IMovieSliderProps) => {
  const history = useHistory();
  const [index, setIndex] = useState(0);

  const onBoxClicked = (movieId: number) => {
    history.push(`${detailPrefix}/${movieId}`);
  };

  const increaseIndex = () => {
    console.log(leaving);
    if (data) {
      // if (leaving) return;
      toggleLeaving();
      const totalMovies = data.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  return (
    <Slider>
      <Title>{title}</Title>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
      >
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
        >
          {data
            .slice(0)
            .slice(offset * index, offset * index + offset)
            .map((movie: any) => (
              <Box
                layoutId={movie.id + ""}
                key={movie.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                onClick={() => onBoxClicked(movie.id)}
                transition={{ type: "tween" }}
                bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
          {data.length > offset && <ArrowBox onClick={increaseIndex}>{">"}</ArrowBox>}
        </Row>
      </AnimatePresence>
    </Slider>
  );
};

export default MovieSlider;
