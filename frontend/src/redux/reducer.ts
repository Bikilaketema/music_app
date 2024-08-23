import { GET_SONGS_SUCCESS } from "./actions";

const defaultReducer = (state = { songs: [] }, action) => {
  switch (action.type) {
    case GET_SONGS_SUCCESS:
      return { ...state, songs: action.songs || [] }; // Default to an empty array if `action.songs` is undefined
    default:
      return state;
  }
};

export default defaultReducer;
