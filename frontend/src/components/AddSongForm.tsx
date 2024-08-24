/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { system } from 'styled-system';
import React, { useState } from 'react';
import axios from 'axios';

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
    margin: 8px auto; // Reduce margin for very small screens
    width: 90%;
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
  border: 2px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 5px;
  background-color: #007bff; // Match EditSongForm background color
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  @media (max-width: 600px) {
    padding: 6px;
    font-size: 14px; // Adjust font size for small screens
  }
`;

const Label = styled.label`
  color: white;
  font-size: 14px; // Adjust font size for better readability
  margin-bottom: 8px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #0056b3; // Darker shade for consistency with EditSongForm
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #004494;
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px; // Adjust font size for small screens
  }
`;

const AddSongForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const songData = {
      title,
      artist,
      album,
      genre,
      image
    };

    try {
      await axios.post('http://localhost:5000/api/songs/newsong', songData);
      alert('Song added successfully.');
      // Reset form fields
      setTitle('');
      setArtist('');
      setAlbum('');
      setGenre('');
      setImage('');
    } catch (error) {
      console.error('Error adding song:', error);
      alert('Failed to add song.');
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
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ElementContainer>
        <ElementContainer>
          <Label>Artist</Label>
          <Input
            type="text"
            placeholder="Artist"
            required={true}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </ElementContainer>
        <ElementContainer>
          <Label>Album</Label>
          <Input
            type="text"
            placeholder="Album"
            required={true}
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
          />
        </ElementContainer>
        <ElementContainer>
          <Label>Genre</Label>
          <Input
            type="text"
            placeholder="Genre"
            required={true}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </ElementContainer>
        <ElementContainer>
          <Label>Album art link</Label>
          <Input
            type="text"
            placeholder="Album art link"
            required={true}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </ElementContainer>
        <Button type="submit">Add Song</Button>
      </FormElement>
    </FormContainer>
  );
};

export default AddSongForm;
