/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { getSongsFetch } from '../redux/actions';
import { RootState } from '..';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: #f0f0f0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #007BFF;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 32px;
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 8px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const SongItem = styled.div`
  margin-bottom: 16px;
`;

function SongList() {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.defaultReducer.songs);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  const sections = ['Songs', 'Title', 'Artist', 'Album', 'Genre'];

  const renderContent = () => {
    if (!songs || songs.length === 0) return <div>No songs available.</div>;

    switch (activeIndex) {
      case 0:
        return (
          <Column>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <h3>{song.title}</h3>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <p>Genre: {song.genre}</p>
              </SongItem>
            ))}
          </Column>
        );
      case 1:
        return (
          <Column>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <p>{song.title}</p>
              </SongItem>
            ))}
          </Column>
        );
      case 2:
        return (
          <Column>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <p>{song.artist}</p>
              </SongItem>
            ))}
          </Column>
        );
      case 3:
        return (
          <Column>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <p>{song.album}</p>
              </SongItem>
            ))}
          </Column>
        );
      case 4:
        return (


          <Column>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <p>{song.genre}</p>
              </SongItem>
            ))}
          </Column>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <TopMenu>
        {sections.map((section, index) => (
          <MenuItem key={index} onClick={() => setActiveIndex(index)}>
            {section}
          </MenuItem>
        ))}
      </TopMenu>
      <Content>{renderContent()}</Content>
    </Container>
  );
}

export default SongList;
