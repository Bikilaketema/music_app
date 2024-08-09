/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { fetchSongsRequest } from '../redux/songSlice';
import { RootState } from '../redux/store'
import AddSongForm from './AddSongForm';

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

function SongList() {
  const dispatch = useDispatch();
  const { artists, albums, genres, titles, loading } = useSelector(
    (state: RootState) => state.songs
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const sections = ['Artist', 'Album', 'Genre', 'Title','Add song'];

// src/components/SongList.tsx

const renderContent = () => {
  if (loading) return <div>Loading...</div>;

  // Add a check to ensure the data arrays are defined
  if (!artists || !albums || !genres || !titles) {
    return <div>No data available.</div>;
  }

  switch (activeIndex) {
    case 0:
      return (
        <ul>
          {artists.map((artist: string, index: number) => (
            <li key={index}>{artist}</li>
          ))}
        </ul>
      );
    case 1:
      return (
        <ul>
          {albums.map((album: string, index: number) => (
            <li key={index}>{album}</li>
          ))}
        </ul>
      );
    case 2:
      return (
        <ul>
          {genres.map((genre: string, index: number) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      );
    case 3:
      return (
        <ul>
          {titles.map((title: string, index: number) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      );
      case 4:
        return (
          <AddSongForm/>
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
