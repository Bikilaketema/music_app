/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { system } from 'styled-system';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Define custom styles using Styled System
const formStyles = system({
  padding: { property: 'padding', scale: 'space' },
  margin: { property: 'margin', scale: 'space' },
  borderRadius: { property: 'borderRadius', scale: 'radii' },
  boxShadow: { property: 'boxShadow', scale: 'shadows' },
  backgroundColor: { property: 'backgroundColor', scale: 'colors' },
});

const FormContainer = styled.div`
  ${formStyles}
  width: 100%;
  max-width: 600px;
  margin: 16px auto; // Adjust margin for small screens
  padding: 16px;
  background-color: #007bff; // Match EditSongForm background color
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 12px;
    width: 90%;
    margin: 8px auto; // Reduce margin for very small screens
  }
`;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #ddd; // Match AddSongForm border color
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  background-color: #007bff; // Match AddSongForm background color

  @media (max-width: 768px) {
    padding: 6px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const Label = styled.label`
  color: white;
  font-size: 16px;
  margin: 4px 0;

  @media (max-width: 768px) {
    font-size: 14px;
    margin: 2px 0;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin: 1px 0;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #0056b3; // Darker shade for consistency with AddSongForm
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #004494;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const EditSongForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');

  const [originalData, setOriginalData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    image: ''
  });

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/api/songs/get/${id}`);
        const song = response.data;
        setTitle(song.title);
        setArtist(song.artist);
        setAlbum(song.album);
        setGenre(song.genre);
        setImage(song.image);
        setOriginalData({
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
          image: song.image
        });
      } catch (error) {
        console.error('Error fetching song data:', error);
        alert('Failed to load song data.');
      }
    };

    fetchSongData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedSongData = {
      title,
      artist,
      album,
      genre,
      image,
    };

    const isNoChange = Object.keys(originalData).every(key => originalData[key] === updatedSongData[key]);

    if (isNoChange) {
      alert('No changes have been made!');
      return;
    }

    try {
      await axios.patch(`${process.env.REACT_APP_API_KEY}/api/songs/update/${id}`, updatedSongData);
      alert('Song updated successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error updating song:', error);
      alert('Failed to update song.');
    }
  };

  return (
    <FormContainer>
      <FormElement onSubmit={handleSubmit}>
        <ElementContainer>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ElementContainer>

        <ElementContainer>
          <Label>Artist</Label>
          <Input
            type="text"
            placeholder="Artist"
            required
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </ElementContainer>

        <ElementContainer>
          <Label>Album</Label>
          <Input
            type="text"
            placeholder="Album"
            required
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </ElementContainer>

        <ElementContainer>
          <Label>Genre</Label>
          <Input
            type="text"
            placeholder="Genre"
            required
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </ElementContainer>

        <ElementContainer>
          <Label>Album art link</Label>
          <Input
            type="text"
            placeholder="Album art link"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </ElementContainer>

        <Button type="submit">Update Song</Button>
      </FormElement>
    </FormContainer>
  );
};

export default EditSongForm;
