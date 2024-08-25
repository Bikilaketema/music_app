import { takeEvery, call, put } from "@redux-saga/core/effects";
import { GET_SONGS_FETCH, GET_SONGS_SUCCESS } from "./actions";

async function songsFetch() {
  const response = await fetch(
    `${process.env.REACT_APP_API_KEY}/api/songs/allsongs`
  );
  return await response.json();
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
