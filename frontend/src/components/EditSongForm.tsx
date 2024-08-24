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

const ElementContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 5px;
    background-color: #007bff;`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Label = styled.label`
    color: white;
    text-size: 10px;
    margin: 5px;
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
        // Fetch the existing song data by ID
        const fetchSongData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/songs/get/${id}`);
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

        // Check if any field has changed
        const isNoChange = Object.keys(originalData).every(key => originalData[key] === updatedSongData[key]);

        if (isNoChange) {
            alert('No changes have been made!');
            return; // Exit the function to prevent the PATCH request
        }



        try {
            await axios.patch(`http://localhost:5000/api/songs/update/${id}`, updatedSongData);
            alert('Song updated successfully.');
            navigate('/'); // Redirect to home page after successful update
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
                        value={genre}
                        required={true}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </ElementContainer>

                <ElementContainer>
                    <Label>Album art link</Label>
                    <Input
                        type="text"
                        placeholder="album art link"
                        required={true}
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
