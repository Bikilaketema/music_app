/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import axios from 'axios';
import {
  FormContainer,
  FormElement,
  ElementContainer,
  Input,
  Label,
  Button
} from '../styles/Form.style';


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
      await axios.post(`${process.env.REACT_APP_API_KEY}/api/songs/newsong`, songData);
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
