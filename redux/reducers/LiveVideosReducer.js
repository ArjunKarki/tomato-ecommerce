import {
  FETCH_LIVE_VIDEOS_BEGIN,
  UPDATE_LIVE_VIDEOS,
  UPDATE_IS_LIVE,
} from "../constants";

const initState = {
  isLiveVideos: false,
  data: [],
  loading: false,
};

export const LiveVideosReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_LIVE_VIDEOS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_IS_LIVE:
      return {
        ...state,
        isLiveVideos: action.payload,
      }

    case UPDATE_LIVE_VIDEOS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};