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
  margin: 100px auto;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
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
        <Input
          type="text"
          placeholder="Title"
          required={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Artist"
          required={true}
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Album"
          required={true}
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Genre"
          required={true}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <Input
          type="text"
          placeholder="album art link"
          required={true}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button type="submit">Add Song</Button>
      </FormElement>
    </FormContainer>
  );
};

export default AddSongForm;
