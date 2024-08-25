/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FormContainer,
  FormElement,
  ElementContainer,
  Input,
  Label,
  Button
} from '../styles/Form.style';

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
