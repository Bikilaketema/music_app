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
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const SongItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
`;

const SongImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const EditButton = styled.button`
  width: 30%;
  margin: 5px;
  background-color: #007BFF;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`;

const DeleteButton = styled.button`
  width: 30%;
  margin: 5px;
  background-color: red;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
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
          <Grid>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <SongImage src={song.image} alt="album art" />
                <h3>{song.title}</h3>
                <p>Artist: {song.artist}</p>
                <p>Album: {song.album}</p>
                <p>Genre: {song.genre}</p>
                <EditButton>Edit</EditButton>
                <DeleteButton>Delete</DeleteButton>
              </SongItem>
            ))}
          </Grid>
        );
      case 1:
        return (
          <Grid>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <h4>{song.title}</h4>
              </SongItem>
            ))}
          </Grid>
        );
      case 2:
        return (
          <Grid>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <h4>{song.artist}</h4>
              </SongItem>
            ))}
          </Grid>
        );
      case 3:
        return (
          <Grid>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <h4>{song.album}</h4>
              </SongItem>
            ))}
          </Grid>
        );
      case 4:
        return (
          <Grid>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <h4>{song.genre}</h4>
              </SongItem>
            ))}
          </Grid>
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
