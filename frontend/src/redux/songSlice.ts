// src/redux/songSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface SongState {
  artists: string[];
  albums: string[];
  genres: string[];
  titles: string[];
  loading: boolean;
}

const initialState: SongState = {
  artists: [],
  albums: [],
  genres: [],
  titles: [],
  loading: false,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action) => {
      state.artists = action.payload.artists;
      state.albums = action.payload.albums;
      state.genres = action.payload.genres;
      state.titles = action.payload.titles;
      state.loading = false;
    },
    fetchSongsFailure: (state) => {
      state.loading = false;
    },
  },
});

export const { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } = songSlice.actions;

export default songSlice.reducer;
