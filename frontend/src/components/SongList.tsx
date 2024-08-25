/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongsFetch } from '../redux/actions';
import { RootState } from '..';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingText, Grid, MenuItem, Content, Container, TopMenu, MainGrid, SongImage, SongDetailsContainer, SongItem, ButtonsContainer, DeleteButton, EditButton } from '../styles/SongList.style';


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
    if (!songs || songs.length === 0) return <LoadingText>Loading...</LoadingText>;

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
            {songs.map((song: { _id: React.Key; image: string; artist: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal; }) => (
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
