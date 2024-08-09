import { call, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { fetchSongsSuccess, fetchSongsFailure } from './songSlice';

interface ApiResponse {
  songs: Song[];
}

interface Song {
  artist: string;
  album: string;
  genre: string;
  title: string;
}

function* fetchSongsSaga(): Generator<any, void, AxiosResponse<ApiResponse>> {
  try {
    const response: AxiosResponse<ApiResponse> = yield call(axios.get, 'http://localhost:5000/api/songs/allsongs');
    const songs = response.data.songs;

    const data = {
      artists: songs.map(song => song.artist),
      albums: songs.map(song => song.album),
      genres: songs.map(song => song.genre),
      titles: songs.map(song => song.title),
    };

    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(fetchSongsFailure());
  }
}

export default fetchSongsSaga;
