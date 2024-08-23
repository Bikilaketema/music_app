import { takeEvery, call, put } from "@redux-saga/core/effects";
import { GET_SONGS_FETCH, GET_SONGS_SUCCESS } from "./actions";

function songsFetch() {
  return fetch("http://localhost:5000/api/songs/allsongs").then((response) =>
    response.json()
  );
}

function* workGetSongsFetch() {
  const response = yield call(songsFetch);
  const songs = response.songs; // Extract the songs array from the response
  yield put({ type: GET_SONGS_SUCCESS, songs });
}

function* fetchSongsSaga() {
  yield takeEvery(GET_SONGS_FETCH, workGetSongsFetch);
}

export default fetchSongsSaga;
