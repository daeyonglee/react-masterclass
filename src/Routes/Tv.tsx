import { motion } from "framer-motion";
import { useQueries } from "react-query";
import styled from "styled-components";
import { getAiringTodayTvShow, getLatestTvShow, getPopularTvShow, getTopRatedTvShow } from "../api";
import { makeImagePath } from "../utils";
import MovieSlider from "../Components/MovieSlider";
import { useState } from "react";

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function Tv() {
  const [
    { data: latestData, isLoading: isLatestLoading },
    { data: popularData, isLoading: isPopularLoading },
    { data: airingTodayData, isLoading: isAiringTodayLoading },
    { data: topRatedData, isLoading: isTopRatedLoading },
  ] = useQueries([
    {
      queryKey: ["tv", "latest"],
      queryFn: getLatestTvShow,
    },
    {
      queryKey: ["tv", "popular"],
      queryFn: getPopularTvShow,
    },
    {
      queryKey: ["tv", "airingToday"],
      queryFn: getAiringTodayTvShow,
    },
    {
      queryKey: ["tv", "topRated"],
      queryFn: getTopRatedTvShow,
    },
  ]);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const loading = isLatestLoading || isPopularLoading || isAiringTodayLoading || isTopRatedLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(popularData?.results[0].backdrop_path || "")}>
            <Title>{popularData?.results[0].name}</Title>
            <Overview>{popularData?.results[0].overview}</Overview>
          </Banner>
          {latestData && (
            <MovieSlider
              detailPrefix="/tv"
              title="Latest"
              data={[latestData]}
              leaving={leaving}
              toggleLeaving={toggleLeaving}
            />
          )}
          <MovieSlider
            detailPrefix="/tv"
            title="Popular"
            data={popularData.results}
            leaving={leaving}
            toggleLeaving={toggleLeaving}
          />
          <MovieSlider
            detailPrefix="/tv"
            title="Top Rated"
            data={topRatedData.results}
            leaving={leaving}
            toggleLeaving={toggleLeaving}
          />
          <MovieSlider
            detailPrefix="/tv"
            title="Airing Today"
            data={airingTodayData.results}
            leaving={leaving}
            toggleLeaving={toggleLeaving}
          />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
