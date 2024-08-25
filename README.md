# Music App 🎵

## Overview

Welcome to the Music App! This full stack application is built using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS) and features both backend and frontend components. It allows users to manage song information, view statistics, and interact with the data seamlessly.

## Backend 🎤

The backend is a REST API designed to manage song information. You can perform the following operations:

- **Create** a new song
- **List** all songs
- **Update** song details
- **Remove** a song

### Key Features

- **Song Model**: Handles the following information:

  - Title
  - Artist
  - Album
  - Genre

- **Statistics**:
  - Total number of songs, artists, albums, genres
  - Number of songs in each genre
  - Number of songs and albums for each artist
  - Number of songs in each album

### Technologies

- **ExpressJS**: For handling requests
- **MongoDB**: For data storage
- **Mongoose**: For modeling data and creating schemas

### Configuration

Create a `.env` file in the root directory of the backend with the following content:

- `MONGO_URI`: The connection string for MongoDB.
- `PORT`: port number u want the app to run on.

### Getting Started

1. **Clone the Repository**:
   `git clone https://github.com/Bikilaketema/music_app`

2. **Navigate to the Project Directory**:
   `cd music_app/backend`

3. **Install Dependencies**:
   `npm install`

4. **Start the Backend Server**:
   `npm start`

## Frontend 🎨

The frontend displays a list of songs and provides functionality to create, update, and delete songs. It also shows statistical data fetched from the backend.

### Key Features

- **List Songs**: View and manage the list of songs
- **Create, Update, Delete**: Modify song information
- **Statistics Section**: Display various statistics about the songs

### Technologies

- **Typescript**: For type safety and improved code quality
- **ReactJS**: For building the user interface
- **Redux Toolkit**: For state management
- **Redux-Saga**: For making API calls
- **Emotion & Styled System**: For styling the app

### Configuration

Create a `.env` file in the root directory of the frontend with the following content:

- `REACT_APP_API_KEY`: The base URL of the backend API.

### Getting Started

1. **Navigate to the Frontend Directory**:
   `cd music_app/frontend`

2. **Install Dependencies**:
   `npm install`

3. **Start the Development Server**:
   `npm start`

4. **Access the Application**:
   - Open your browser and go to: `http://localhost:3000`

## Troubleshooting

- **Connection Issues**: Ensure both the backend and frontend servers are running and accessible.
- **Configuration Errors**: Check that the `.env` files are correctly configured and loaded.
- **Application Errors**: Check the console and logs for error details.

Happy coding! 🎉
