import Head from "next/head";
import RandomView from "../components/RandomView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import { useState } from "react";
import styled from "styled-components";
import List from "../components/List";
import type { ArtistInterface } from "../lib/ArtistClass";

type HomeProps = {
  onLike: () => void;
  likes: string[];
  artists: ArtistInterface[];
};
export type ViewPoint = {
  random: boolean;
  artists: boolean;
  favorites: boolean;
};
type View = "random" | "artists" | "favorites";

export default function Home({
  onLike,
  likes,
  artists,
}: HomeProps): JSX.Element {
  const [viewPoint, setViewPoint] = useState<ViewPoint>({
    random: true,
    artists: false,
    favorites: false,
  });

  function handleSwitchView(view: View): void {
    setViewPoint({
      random: false,
      artists: false,
      favorites: false,
      [view]: true,
    });
  }

  return (
    <>
      <Head>
        <title>Wannado</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />

      <StyledButtonWrapper>
        <StyledButton
          onClick={() => handleSwitchView("random")}
          name={"Surprise Me!"}
          inactive={!viewPoint.random}
        />
        <StyledButton
          onClick={() => handleSwitchView("artists")}
          name={"Browse Artists"}
          inactive={!viewPoint.artists}
        />
        <StyledButton
          onClick={() => handleSwitchView("favorites")}
          name={"Favorites"}
          inactive={!viewPoint.favorites}
        />
      </StyledButtonWrapper>

      {/* Switching between the three different views */}

      {viewPoint.random && (
        <RandomView artists={artists} viewPoint={viewPoint} />
      )}
      {viewPoint.artists && (
        <StyledList>
          {artists.map((artist) => (
            <List
              key={artist._id}
              {...artist}
              onLike={onLike}
              isLiked={likes.includes(artist._id)}
            />
          ))}
        </StyledList>
      )}
      {viewPoint.favorites && likes.length === 0 ? (
        <>
          <StyledPlaceholder>No likes yet...</StyledPlaceholder>
          <StyledPlaceholder>🥲</StyledPlaceholder>
        </>
      ) : (
        <StyledList>
          {artists.map(
            (artist) =>
              likes.includes(artist._id) && (
                <List key={artist._id} {...artist} onLike={onLike} isLiked />
              )
          )}
        </StyledList>
      )}

      <Footer />
    </>
  );
}

const StyledList = styled.div`
  margin-bottom: 60px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
`;

const StyledPlaceholder = styled.h2`
  margin: 50px;
  color: rgba(217, 217, 217, 1);
`;

const StyledButton = styled(Button)`
  font-size: 0.7em;
`;
