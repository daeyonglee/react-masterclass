import { useQueries, useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getLatestedMovies, getMovies, getTopRatedMovies, getUpcomingMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import MovieSlider from "../Components/MovieSlider";

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

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useScroll();
  const [
    { data, isLoading },
    { data: latestData, isLoading: isLatestisLoading },
    { data: topRatedData, isLoading: isTopRatedLoading },
    { data: upcomingData, isLoading: isUpcomingLoading },
  ] = useQueries([
    {
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    },
    {
      queryKey: ["movies", "latest"],
      queryFn: getLatestedMovies,
    },
    {
      queryKey: ["movies", "topRated"],
      queryFn: getTopRatedMovies,
    },
    {
      queryKey: ["movies", "upcoming"],
      queryFn: getUpcomingMovies,
    },
  ]);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onOverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId && data?.results.find((movie: any) => movie.id === +bigMovieMatch.params.movieId);

  const loading = isLoading || isLatestisLoading || isTopRatedLoading || isUpcomingLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          {latestData && (
            <MovieSlider
              title="Latest"
              data={[latestData]}
              leaving={leaving}
              toggleLeaving={toggleLeaving}
            />
          )}
          <MovieSlider
            title="Top Rated"
            data={topRatedData.results}
            leaving={leaving}
            toggleLeaving={toggleLeaving}
          />
          <MovieSlider
            title="Upcoming"
            data={upcomingData.results}
            leaving={leaving}
            toggleLeaving={toggleLeaving}
          />
          <MovieSlider
            title="Now Playing"
            data={data.results}
            leaving={leaving}
            toggleLeaving={toggleLeaving}
          />

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
