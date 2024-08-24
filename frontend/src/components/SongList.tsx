/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { getSongsFetch } from '../redux/actions';
import { RootState } from '..';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-around;
  padding:  16px;
  background-color: #f0f0f0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #007BFF;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SongItem = styled.div`
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const SongImage = styled.img`
  width: 100%;
  height: 200px;
  max-height: 200px;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const Button = styled.button`
  width: 48%;
  margin: 4px;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const EditButton = styled(Button)`
  background-color: #007BFF;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`;

const DeleteButton = styled(Button)`
  background-color: red;

  &:hover {
    background-color: #d43f3a;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #c9302c;
    transform: translateY(0);
  }
`;

const SongDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  gap: 2px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  margin-top: 10px;
`;

function SongList() {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.defaultReducer.songs);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  const sections = ['Songs', 'Title', 'Artist', 'Album', 'Genre'];

  const handleEditClick = (id: string) => {
    navigate(`/edit-song/${id}`);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_KEY}/api/songs/delete/${id}`);
        alert('Song deleted successfully.');
        dispatch(getSongsFetch());
      } catch (error) {
        console.error('Error deleting song:', error);
        alert('Failed to delete song.');
      }
    }
  };

  const renderContent = () => {
    if (!songs || songs.length === 0) return <div>No songs available.</div>;

    switch (activeIndex) {
      case 0:
        return (
          <MainGrid>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <SongImage src={song.image} alt="album art" />
                <SongDetailsContainer>
                  <h3>{song.title}</h3>
                  <p>Artist: {song.artist}</p>
                  <p>Album: {song.album}</p>
                  <p>Genre: {song.genre}</p>
                </SongDetailsContainer>
                <ButtonsContainer>
                  <EditButton onClick={() => handleEditClick(song._id)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDeleteClick(song._id)}>Delete</DeleteButton>
                </ButtonsContainer>
              </SongItem>
            ))}
          </MainGrid>
        );
      case 1:
        return (
          <Grid>
            {songs.map((song) => (
              <SongItem key={song._id}>
                <SongImage src={song.image} alt="album art" />
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
                <SongImage src={song.image} alt="album art" />
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
                <SongImage src={song.image} alt="album art" />
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
                <SongImage src={song.image} alt="album art" />
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
