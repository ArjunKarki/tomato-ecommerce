import {
  FETCH_LIVE_VIDEOS_BEGIN,
  UPDATE_LIVE_VIDEOS,
  UPDATE_IS_LIVE,
} from "../constants";
import { Woo } from "../../API";

export const FetchLiveVideos = () => (dispatch) => {
  dispatch({ type: FETCH_LIVE_VIDEOS_BEGIN });
  try {
    Woo.get("/live-promos").then(({ data }) => {
      data.forEach((item) => {
        if (item.live) {
          dispatch({ type: UPDATE_IS_LIVE, payload: true });
        }
      });
      dispatch({ type: UPDATE_LIVE_VIDEOS, payload: data });
    });
  } catch (err) {
    console.log("Error in fetching live videos => ", err);
  }
};