// src/redux/songSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SongState {
  artists: string[];
  albums: string[];
  genres: string[];
  titles: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  artists: [],
  albums: [],
  genres: [],
  titles: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(
      state,
      action: PayloadAction<{
        artists: string[];
        albums: string[];
        genres: string[];
        titles: string[];
      }>
    ) {
      state.artists = action.payload.artists;
      state.albums = action.payload.albums;
      state.genres = action.payload.genres;
      state.titles = action.payload.titles;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } =
  songSlice.actions;

export default songSlice.reducer;
